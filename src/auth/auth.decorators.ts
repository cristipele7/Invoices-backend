import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

type UserProperty = keyof User;
export const PrismaUser = createParamDecorator<UserProperty>(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const jwtService = new JwtService();
    const user = jwtService.decode(token);

    return user?.id;
  },
);
