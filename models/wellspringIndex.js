const mongoose = require('mongoose');
const { Schema } = mongoose;

const wellspringSchema = new Schema({
    currRotationIndex: Number
});

mongoose.model('wellspringRotation', wellspringSchema, 'WellspringRotation');
