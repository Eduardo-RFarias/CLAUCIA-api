export class TokenPayloadDto {
  identifier: string; // coren for professional, name for institution
  role: 'professional' | 'institution';
}
