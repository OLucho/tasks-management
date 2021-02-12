import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    try {
      await user.save();
    } catch (error) {
      const DUPLICATE_USERNAME_ERROR = '23505';
      if (error.code === DUPLICATE_USERNAME_ERROR) {
        throw new ConflictException('Sorry, Username already exists');
      } else {
        throw new InternalServerErrorException('Wops   Something went wrong');
      }
    }
  }
}
