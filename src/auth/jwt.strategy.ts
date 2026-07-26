import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      issuer: 'http://localhost:8888/realms/angular-grade',

      algorithms: ['RS256'],

      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:
            'http://host.docker.internal:8888/realms/angular-grade/protocol/openid-connect/certs',
      }),
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      roles: payload.realm_access?.roles ?? [],
      clientRoles: payload.resource_access ?? {},
    };
  }
}