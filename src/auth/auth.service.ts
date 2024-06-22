import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createAdmin(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser: Partial<User> = {
      username,
      password: hashedPassword,
      role: 'admin',
    };
    return this.usersService.create(adminUser);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        username: user.username,
        role: user.role,
      },
    };
  }

  async register(username: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: Partial<User> = { username, password: hashedPassword, role };
    const user = await this.usersService.create(newUser);
    const { password: _, ...result } = user;
    return result;
  }
}
