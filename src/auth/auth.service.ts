import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

export interface JwtStrategyPayload {
  sub: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User) {
    const payload: JwtStrategyPayload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
