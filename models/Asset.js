const { model, Schema } = require('mongoose');


const assetSchema = new Schema({
    assetName: String,
    assetType: {
        type: String,
        enum: ['ROAD', 'BUILDING']
    },
    assetOwner: String,
    assetContractor: String,
    assetLocation: String,
    createdAt: String,
});

module.exports = model('Asset', assetSchema)