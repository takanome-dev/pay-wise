import { registerAs } from '@nestjs/config';

export type JwtConfigType = ReturnType<typeof JwtConfig>;

export const JwtConfig = registerAs('jwt', () => ({
  jwt_passwd_key: String(process.env.JWT_PASSWD_SECRET),
  jwt_pin_key: String(process.env.JWT_PIN_SECRET),
  jwt_cc_key: String(process.env.JWT_CC_SECRET),
  jwt_cypher_key: String(process.env.JWT_CYPHER_KEY),
}));

export default JwtConfig;
