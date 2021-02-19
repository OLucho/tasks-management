import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { JwtStrategy } from './jwt/jwt.strategy';

const mockAuthRepository = () => ({
  signUp: jest.fn(),
  validateUserPassword: jest.fn(),
  signIn: jest.fn(),
});
const mockJwtStrategy = () => ({
  sign: jest.fn(),
});
const mockCredentialsDto = { username: 'username', password: 'password' };

describe('TaskService', () => {
  let authService;
  let authRepository;
  let jwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [
        AuthService,
        { provide: JwtStrategy, useFactory: mockJwtStrategy },
        { provide: AuthRepository, useFactory: mockAuthRepository },
      ],
    }).compile();
    authService = await module.get<AuthService>(AuthService);
    authRepository = await module.get<AuthRepository>(AuthRepository);
    jwtStrategy = await module.get(JwtStrategy);
  });

  describe('SignUp', () => {
    it('Sign up calls Repository', async () => {
      await authService.signUp(mockCredentialsDto);

      expect(authRepository.signUp).toHaveBeenCalled();
      expect(authRepository.signUp).toHaveBeenCalledWith(mockCredentialsDto);
    });
  });

  describe('SignIn', () => {
    it('SignIn Throws UnauthorizedException if user is invalid', async () => {
      authRepository.validateUserPassword.mockResolvedValue();

      await expect(authService.signIn(mockCredentialsDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    // CANT MOCK JWTSTRATEGY..
    // it('SignIn returns AccessToken if user is valid', async () => {
    //   authRepository.validateUserPassword.mockResolvedValue('username');
    //   jwtStrategy.sign.mockResolvedValue('token123456');
    //   const result = await authService.signIn(mockCredentialsDto);

    //   expect(authRepository.validateUserPassword).toHaveBeenCalled();
    //   await expect(authService.signIn(mockCredentialsDto)).resolves.not.toThrow(
    //     UnauthorizedException,
    //   );
    //   await expect(jwtStrategy.sign).toHaveBeenCalled();
    //   expect(result).toEqual('username');
    // });
  });
});
