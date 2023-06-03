import type { JwtUserDto } from './user/user.dto';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserDto;
    }
  }
}
