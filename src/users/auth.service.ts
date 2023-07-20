import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    // Lookup all user by providing email
    const users = await this.usersService.find(email);

    // checked user is exist
    if (users.length) {
      throw new BadRequestException('Email is already use!');
    }
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    // save the user credentials
    const user = await this.usersService.create(email, result);
    return user;
  }

  async signin(email: string, password: string) {
    // Lookup user table
    const [user] = await this.usersService.find(email);
    // checked user is exist
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    // password split with dot and stored variable using array distructuring
    const [salt, storedHash] = user.password.split('.');

    // hashed provided password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password!');
    }
    return user;
  }
}
