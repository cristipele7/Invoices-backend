import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './auth.dto';

export interface JwtStrategyPayload {
  sub: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(authUser: AuthDto) {
    const dbUser = await this.prisma.user.findFirst({
      where: {
        email: authUser.email,
      },
    });
    if (!dbUser) {
      throw new BadRequestException('User with this email does not exists!');
    }

    const checkPassword = await bcrypt.compare(
      authUser.password,
      dbUser.password,
    );
    if (!checkPassword) {
      throw new BadRequestException('Invalid password!');
    }

    const payload: JwtStrategyPayload = {
      email: authUser.email,
      sub: dbUser.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
