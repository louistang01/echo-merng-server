const { AuthenticationError, UserInputError } = require('apollo-server');

const Asset = require('../../models/Asset');
//const checkAuth = require('../../util/check-auth');


module.exports = {
  Query: {
    //getting all assets
    async getAssets() {
      try {
          //telling mongoose to inverse the sorting of new assets
        const assets = await Asset.find().sort({ createdAt: -1 });
        return assets;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAsset(_, { assetId }) {
        try {
          const asset = await Asset.findById(assetId);
          if (asset) {
            return asset;
          } else {
            throw new Error('Asset not found');
          }
        } catch (err) {
          throw new Error(err);
        }
      }
  }
}
