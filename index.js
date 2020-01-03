const express = require('express');
const graphqlMiddleware = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInputObjectType, GraphQLString } = require('graphql');

const app = express();

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    name: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString,
      resolve(parent) {
        return `${parent.name}'s Author`
      }
    }
  }
})

const BookInputType = new GraphQLInputObjectType({
  name: 'BookInput',
  fields: {
    name: {
      type: GraphQLString
    }
  }
})

app.use('/graphql', graphqlMiddleware({
  schema: new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Root',
      fields: {
        test: { 
          type: GraphQLString,
          args: { id: { type: GraphQLString, defaultValue: 1 } },
          resolve(parent, args){
            return `Working ${args.id}`;
          },
        },
        book: {
          type: BookType,
          resolve(){
            return { name: 'book' }
          }
        }
      }
    }),
    mutation: new GraphQLObjectType({
      name: 'mutation',
      fields: {
        addBook: {
          type: BookType,
          args: { book: { type: BookInputType } },
          resolve(){
            return { name: 'book' }
          }
        }
      }
    })
  }),
  graphiql: true,
}));

app.listen(7500, () => {
  console.log('open');
})
