import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';

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
});
