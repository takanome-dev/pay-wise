import type { NestMiddleware } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { Request, NextFunction } from 'express';
import type { ValidationError } from 'class-validator';
import { validateOrReject } from 'class-validator';
import { LoginUserDto } from './auth.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, _: unknown, next: NextFunction) {
    const body = req.body as Record<string, unknown>;
    const login = new LoginUserDto();
    const errors = [];

    Object.keys(body).forEach((key) => {
      login[key] = body[key];
    });

    try {
      await validateOrReject(login);
    } catch (errs) {
      (errs as ValidationError[])?.forEach((err) => {
        Object.values(err.constraints).forEach((constraint) =>
          errors.push(constraint),
        );
      });
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    next();
  }
}
