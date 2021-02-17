import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('User Entity', () => {
  let user: User;
  beforeEach(() => {
    user = new User();
    user.salt = 'salt';
    user.password = 'password';
    bcrypt.hash = jest.fn();
  });

  describe('Validate Password Method', () => {
    it('Returns TRUE if password is VALID', async () => {
      bcrypt.hash.mockReturnValue('password');
      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.ValidatePassword('1234');

      expect(bcrypt.hash).toHaveBeenCalledWith('1234', user.salt);
      expect(result).toEqual(true);
    });

    it('Returns FALSE if password is NOT invalid', async () => {
      bcrypt.hash.mockReturnValue('wrong Password');
      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.ValidatePassword('wrong Password');

      expect(bcrypt.hash).toHaveBeenCalledWith('wrong Password', user.salt);
      expect(result).toEqual(false);
    });
  });
});
