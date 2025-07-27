import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '../../config/app-config.service';
import { TokenPayloadDto } from './dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.jwtSecret,
    });
  }

  validate(payload: any): TokenPayloadDto | null {
    if (!payload.identifier || !payload.role) {
      return null;
    }

    if (payload.role !== 'professional' && payload.role !== 'institution') {
      return null;
    }

    return {
      identifier: payload.identifier,
      role: payload.role,
    };
  }
}
