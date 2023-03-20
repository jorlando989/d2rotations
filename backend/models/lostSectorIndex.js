const mongoose = require('mongoose');
const { Schema } = mongoose;

const lostSectorIndexSchema = new Schema({
    currLostSectorIndex: Number,
    currLostSectorRewardIndex: Number,
    numLostSectors: Number
});

mongoose.model('lostSectorIndex', lostSectorIndexSchema, 'lostSectorIndex');
