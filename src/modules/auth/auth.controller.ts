import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, InstitutionLoginDto, AccessTokenDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/professional')
  @ApiOperation({ summary: 'Professional login and get JWT token' })
  async loginProfessional(@Body() loginDto: LoginDto): Promise<AccessTokenDto> {
    return this.authService.loginProfessional(loginDto);
  }

  @Post('login/institution')
  @ApiOperation({ summary: 'Institution login and get JWT token' })
  async loginInstitution(@Body() loginDto: InstitutionLoginDto): Promise<AccessTokenDto> {
    return this.authService.loginInstitution(loginDto);
  }
}
