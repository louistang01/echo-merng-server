const { gql } = require('apollo-server');

//input from users become arguments in the register(), such as username & password
//but you can make the username and password a type so you don't have some massive argument passed through register() 


//input is a type of "type" that waits for input. 

module.exports = gql`
  enum AssetType{
    ROAD
  }


  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    asset: String!
  }

  type Asset {
    id: ID!
    assetName: String!
    assetType: AssetType!
    assetOwner: String!
    assetContractor: String!
    assetLocation: String!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }




  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getAssets: [Asset]
    getAsset(assetId: ID!): Asset
  }
   type Mutation {
     register(registerInput: RegisterInput): User!
     login(username: String!, password: String!): User!
     createPost(body: String!): Post!
     deletePost(postId: ID!): String!
   }

`;