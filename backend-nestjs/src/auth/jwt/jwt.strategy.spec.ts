import dotenv = require('dotenv');
dotenv.config();

import { Test } from '@nestjs/testing';
import { AuthRepository } from '../auth.repository';
import { User } from '../user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';

const mockAuthRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let authRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: AuthRepository, useFactory: mockAuthRepository },
      ],
    }).compile();
    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    authRepository = await module.get<AuthRepository>(AuthRepository);
  });

  describe('Validate', () => {
    it('Validates and return the user correctly', async () => {
      const user = new User();
      user.username = 'username';

      authRepository.findOne.mockResolvedValue(user);

      const result = await jwtStrategy.validate({ username: 'username' });
      expect(authRepository.findOne).toHaveBeenCalledWith({
        username: 'username',
      });
      expect(result).toEqual(user);
    });

    it('Throws Unauthorized Exception if user is not found', async () => {
      authRepository.findOne.mockResolvedValue(null);

      expect(jwtStrategy.validate({ username: 'username' })).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
