import "reflect-metadata";

import * as BodyParser from "koa-bodyparser";
import * as Cabin from "cabin";
import * as JWT from "koa-jwt";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as TypeGraphQL from "type-graphql";

import { ApolloServer } from "apollo-server-koa";
import { Container } from "typedi";
import User from "entities/User";
import auth from "routes/auth";
import { getRepository } from "typeorm";
import initializeDatabase from "database";
import resolvers from "resolvers";

const secret = process.env.JWT_SECRET || "secret";

async function bootstrap() {
  const cabin = new Cabin();
  await initializeDatabase(cabin);

  const schema = await TypeGraphQL.buildSchema({
    resolvers,
    container: Container,
    emitSchemaFile: true
  });

  const app = new Koa();
  // Add logging
  app.use(cabin.middleware);

  const router = new Router();

  app.use(BodyParser());

  // Add route where you can get JWT
  router.post("/auth", auth);

  // Guard API
  app.use(JWT({ secret }).unless({ path: [/auth/] }));

  // GraphQL initialization
  const server = new ApolloServer({
    schema,
    context: async ({ ctx }) => {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({
        where: { id: ctx.state.user.sub }
      });
      // const user = await userRepository.findOne();
      return { user };
    }
  });
  app.use(server.getMiddleware());

  // Add other routes (authentication)
  app.use(router.routes()).use(router.allowedMethods());

  // Start the server
  app.listen({ port: 3001 }, () =>
    cabin.info(`🚀  Server ready at http://localhost:3001${server.graphqlPath}`)
  );
}

bootstrap();
