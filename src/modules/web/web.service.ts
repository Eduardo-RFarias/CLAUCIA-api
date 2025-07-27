import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InstitutionService } from '../institution/institution.service';

@Injectable()
export class WebService {
  constructor(private readonly institutionService: InstitutionService) {}

  async validateInstitution(name: string, password: string): Promise<boolean> {
    try {
      return await this.institutionService.verifyPassword(name, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
