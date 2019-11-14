import { Query, Resolver, Ctx } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import User from "entities/User";

@Resolver(of => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  @Query(returns => User)
  me(@Ctx() ctx): User {
    return ctx.user;
  }
}
