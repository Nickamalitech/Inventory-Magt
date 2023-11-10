import { ApolloServer, gql } from 'apollo-server';

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
    takeRegisterInfor: User
  }

  type Mutation {
    loginMutation(input: RegistrationInput): User
  }
`;

const usersInDb = []; // Assuming you have a data source to store registered users

const resolvers = {
    // Query to get user credentials from dB
  Query: {
    takeRegisterInfor: () => {
      return usersInDb[0];
    },
  },
  Mutation: {
    loginMutation: (_, { input }) => {
      // Getting user credentials and comparing with registration credentials in the dB
      const foundUser = usersInDb.find(
        (user) => user.username === input.username && user.password === input.password
      );

      if (foundUser) {
        console.log('User login successful');
        return foundUser;
      } else {
        console.log('User login failed');
        return null; 
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
