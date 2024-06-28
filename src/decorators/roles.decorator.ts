import { Reflector } from '@nestjs/core';

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Roles = (roles: string[]) => SetMetadata('roles', roles);
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)