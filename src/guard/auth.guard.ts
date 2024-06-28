import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/auth/constant';
import { IS_PUBLIC_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean {
        const request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
        if (isPublic) {
            return true
        }
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException
        }
        try {
            const payload = this.jwtService.verify(token, {
                secret: jwtConstants.secret
            })
            request['user'] = payload
        } catch {
            throw new UnauthorizedException
        }
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined
    }
}