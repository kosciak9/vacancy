import * as jwt from "jsonwebtoken";

import User from "entities/User";
import { compare } from "bcrypt";
import { getRepository } from "typeorm";
import { DefaultContext } from "koa";

const secret = process.env.JWT_SECRET || "secret";

const authRoute = async (ctx: DefaultContext) => {
  const { email, password } = ctx.request.body;
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ where: { email } });

  if (user && (await compare(password, user.password))) {
    const payload = { sub: user.id };
    const token = jwt.sign(payload, secret);
    ctx.body = token;
  } else {
    ctx.res.statusCode = 401;
  }
};

export default authRoute;
