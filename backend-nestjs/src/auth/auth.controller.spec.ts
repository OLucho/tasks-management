import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

const mockAuthCredentialsDto: AuthCredentialsDto = {
  password: 'passowrd',
  username: 'usernamee',
};
const mockUser = { username: 'username', id: 1, tasks: [] };

const mockAuthService = () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
});

describe('AuthController', () => {
  let authService;
  let authController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useFactory: mockAuthService }],
    }).compile();
    authService = await module.get<AuthService>(AuthService);
    authController = await module.get<AuthController>(AuthController);
  });

  describe('SignUp', () => {
    it('SignUp calls Service', async () => {
      await authController.signUp(mockAuthCredentialsDto);
      expect(authService.signUp).toHaveBeenCalled();
      expect(authService.signUp).toHaveBeenCalledWith(mockAuthCredentialsDto);
    });
  });
  describe('SignIn', () => {
    it('SignIn calls Service', async () => {
      authService.signIn.mockResolvedValue('token123456');
      const result = await authController.signIn(mockAuthCredentialsDto);
      expect(authService.signIn).toHaveBeenCalled();
      expect(authService.signIn).toHaveBeenCalledWith(mockAuthCredentialsDto);
      expect(result).toEqual('token123456');
    });
  });

  describe('GetUser', () => {
    it('GetUser calls Service', async () => {
      const result = await authController.getUser(mockUser);
      expect(result).toEqual({
        username: mockUser.username,
        id: mockUser.id,
        tasks: mockUser.tasks,
      });
    });
  });
});
