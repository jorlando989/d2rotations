const mongoose = require('mongoose');
const { Schema } = mongoose;

const altarsOfSorrowRewardsSchema = new Schema({
    altarRewardIndex: Number
});

mongoose.model('altarsOfSorrowRotation', altarsOfSorrowRewardsSchema, 'altarsOfSorrowRotation');
