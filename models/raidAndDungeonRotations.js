const mongoose = require('mongoose');
const { Schema } = mongoose;

const raidAndDungeonRotationSchema = new Schema({
    featuredRaidIndex: Number,
    featuredDungeonIndex: Number,
    numRaids: Number,
    numDungeons: Number
});

mongoose.model('raidRotation', raidAndDungeonRotationSchema, 'raidRotation');
