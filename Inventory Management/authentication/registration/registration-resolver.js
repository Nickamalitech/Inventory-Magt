import { ApolloServer, gql } from 'apollo-server';

const usersInDb = [];

const typeDefs = gql`
  type User {
    username: String!
    password: String!
  }

  input RegistrationInput {
    username: String!
    password: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    saveUserToDb(input: RegistrationInput!): User!
  }
`;

const resolvers = {
  Mutation: {
    saveUserToDb(_, { input }) {
      const newUser = { ...input };
      usersInDb.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
