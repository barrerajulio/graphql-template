import { Injectable } from "@graphql-modules/di";

@Injectable()
export class HelloWorldProvider {
  public helloWorld(username: string): string {
    return `Hello ${username}`;
  }
}
