import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'camon',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }
  async validate(payload) {
    const { user_id } = payload;
    const user: User = await this.userRepository.findOne({ user_id });
    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}