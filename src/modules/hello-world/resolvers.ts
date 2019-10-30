import { HelloWorldProvider } from "./hello-world.provider";

export default {
  Query: {
    helloWorld: (_, __, { injector, currentUser }) =>
      injector.get(HelloWorldProvider).helloWorld(currentUser.username)
  }
};
