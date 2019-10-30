import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { GraphQLModule } from "@graphql-modules/core";

import config from "./core/config";
import { AuthModule } from "./modules/auth";
import { HelloWorldModule } from "./modules/hello-world";
import { resolversComposition } from "./modules/common/resolvers-composition";

const PORT = config.port;

const { context, schema } = new GraphQLModule({
  imports: [AuthModule, HelloWorldModule],
  resolversComposition
});

const server = new ApolloServer({
  context,
  schema,
  introspection: config.introspection,
  playground: config.playground
});

server
  .listen(PORT)
  .then(() => console.log(`Listen at http://localhost:${PORT}`));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => console.log("Module disposed. "));
}
