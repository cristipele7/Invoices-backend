import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }
}
