import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log(token);
        
        if (!token) {
        throw new UnauthorizedException();
        }
        try {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
            secret: `${process.env.TOKEN_SECRET}`
            }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        } catch {
        throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        // 1. Vérifie le header Authorization
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (type === 'Bearer' && token) {
            return token;
        }
        // 2. Vérifie le cookie access_token
        if (request.cookies && request.cookies['access_token']) {
            return request.cookies['access_token'];
        }
        return undefined;
    }
}