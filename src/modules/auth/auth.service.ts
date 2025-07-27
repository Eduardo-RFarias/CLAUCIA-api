import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfessionalService } from '../professional/professional.service';
import { InstitutionService } from '../institution/institution.service';
import { LoginDto, InstitutionLoginDto, AccessTokenDto, TokenPayloadDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly professionalService: ProfessionalService,
    private readonly institutionService: InstitutionService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateProfessional(coren: string, password: string): Promise<TokenPayloadDto> {
    const isValid = await this.professionalService.verifyPassword(coren, password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      identifier: coren,
      role: 'professional',
    };
  }

  private async validateInstitution(name: string, password: string): Promise<TokenPayloadDto> {
    const isValid = await this.institutionService.verifyPassword(name, password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      identifier: name,
      role: 'institution',
    };
  }

  async loginProfessional(loginDto: LoginDto): Promise<AccessTokenDto> {
    const payload = await this.validateProfessional(loginDto.coren, loginDto.password);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginInstitution(loginDto: InstitutionLoginDto): Promise<AccessTokenDto> {
    const payload = await this.validateInstitution(loginDto.name, loginDto.password);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
