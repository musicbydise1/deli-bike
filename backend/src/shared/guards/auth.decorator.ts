import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

export function Auth(...roleIds: number[]) {
  return applyDecorators(SetMetadata('roleIds', roleIds), UseGuards(JwtAuthGuard, RolesGuard));
}
