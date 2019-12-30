const express = require('express');
const graphqlMiddleware = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const app = express();

const BookType = new GraphQLObjectType({
  name: 'Book',

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
        }
        // book: {
        //   type: 
        // }
      }
    })
  }),
  graphiql: true,
}));

app.listen(7500, () => {
  console.log('open');
})
