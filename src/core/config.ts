import dotenv from "dotenv";

const env: any = dotenv.config();

export default {
  introspection: env.GRAPHQL_INTROSPECTION || true,
  playground: env.GRAPHQL_PLAYGROUND || true,
  port: env.PORT || 4000
};
