import "graphql-import-node";
import { GraphQLModule } from "@graphql-modules/core";

import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";

export const AuthModule = new GraphQLModule({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Here build the code to authenticate the user, the logic to see here is a demo
    // do not use
    const authToken = req.headers["authorization"];
    if (authToken === "5f4dcc3b5aa765d61d8327deb882cf99") {
      return {
        currentUser: {
          id: 1,
          username: "demo"
        }
      };
    } else if (authToken === "e91e6348157868de9dd8b25c81aebfb9") {
      return {
        currentUser: {
          id: 2,
          username: "admin"
        }
      };
    }
    throw new Error("Token invalid");
  }
});
