import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';
import { User } from './user.entity';
const mockCredentialsDto = { username: 'username', password: 'password' };

describe('AuthRepository', () => {
  let authRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthRepository],
    }).compile();
    authRepository = await module.get<AuthRepository>(AuthRepository);
  });

  describe('SignUp', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      authRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('Successfully signs up the user', async () => {
      save.mockResolvedValue(false);
      await expect(
        authRepository.signUp(mockCredentialsDto),
      ).resolves.not.toThrow();
    });

    it('Throws ConflictException if username is already in use', async () => {
      save.mockRejectedValue({ code: '23505' });
      await expect(authRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('Throws InternalServerError if other error has been c  aught', async () => {
      save.mockRejectedValue({ code: '1234' });
      await expect(authRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('ValidatePassword', () => {
    let user;

    beforeEach(() => {
      authRepository.findOne = jest.fn();
      user = new User();
      user.username = 'username';
      user.ValidatePassword = jest.fn();
    });

    it('Returns the username if validation is successful', async () => {
      authRepository.findOne.mockResolvedValue(user);
      user.ValidatePassword.mockResolvedValue(true);

      const result = await authRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(result).toEqual('username');
    });

    it('Returs null if User is not found', async () => {
      authRepository.findOne.mockResolvedValue(null);
      user.ValidatePassword.mockResolvedValue(true);

      const result = await authRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.ValidatePassword).not.toHaveBeenCalled();
      expect(result).toEqual(null);
    });

    it('Returns null if password is invalid', async () => {
      authRepository.findOne.mockResolvedValue(user);
      user.ValidatePassword.mockResolvedValue(false);

      const result = await authRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.ValidatePassword).toHaveBeenCalled();
      expect(result).toEqual(null);
    });
  });

  describe('HashPassword', () => {
    it('calls bcrypt.hash', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('TestHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await authRepository.hashPassword(
        'TestPassword',
        'TestSalt',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('TestPassword', 'TestSalt');
      expect(result).toEqual('TestHash');
    });
  });
});
