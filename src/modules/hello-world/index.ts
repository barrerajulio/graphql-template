import "graphql-import-node";
import { GraphQLModule } from "@graphql-modules/core";

import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";
import { AuthModule } from "../auth";
import { HelloWorldProvider } from "./hello-world.provider";

export const HelloWorldModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [AuthModule],
  providers: [HelloWorldProvider]
});
