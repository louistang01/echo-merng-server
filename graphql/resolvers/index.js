const postsResolvers = require('./posts');
const usersResolvers = require ('./users');
const assetsResolvers = require ('./assets');
//const commentResolvers = require ('./comments');

module.exports = {

    Query: {
        ...postsResolvers.Query,
        ...assetsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    //     ...commentResolvers.Mutation
    }
    // Subscription: {
    //     ...postsResolvers.Subscription
    // }
}
