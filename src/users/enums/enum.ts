import { registerEnumType } from '@nestjs/graphql';

export enum RolesEnum {
  SUPER_ADMIN = 'Superadmin',
  ADMIN = 'Admin',
  DRIVER = 'Driver',
  USER = 'User',
}

registerEnumType(RolesEnum, {
  name: 'RolesEnum',
});
