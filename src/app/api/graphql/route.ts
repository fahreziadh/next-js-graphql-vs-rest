import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { addTodo, getListTodos, removeTodo, toggleTodo } from "@/db/todo-list";
import { NextRequest } from "next/server";

const resolvers = {
  Query: {
    todoList: () => getListTodos(),
  },
  Mutation: {
    addTodo: async (_: any, args: any) => {
      const { text } = args;
      await addTodo(text);
      return null;
    },
    removeTodo: async (_: any, args: any) => {
      const { text } = args;
      await removeTodo(text);
      return null;
    },
    toggleTodo: async (_: any, args: any) => {
      const { text } = args;
      await toggleTodo(text);
      return null;
    },
  },
};

const typeDefs = gql`
  type Todo {
    text: String!
    completed: Boolean!
  }

  type Query {
    todoList: [Todo]
  }
  type Mutation {
    addTodo(text: String!): String
    removeTodo(text: String!): String
    toggleTodo(text: String!): String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
