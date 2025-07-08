import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfessionalService } from '../professional/professional.service';
import { LoginDto, AccessTokenDto, TokenPayloadDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly professionalService: ProfessionalService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(coren: string, password: string): Promise<TokenPayloadDto> {
    const isValid = await this.professionalService.verifyPassword(coren, password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { coren };
  }

  async login(loginDto: LoginDto): Promise<AccessTokenDto> {
    const payload = await this.validateUser(loginDto.coren, loginDto.password);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
