const mongoose = require('mongoose');
const { Schema } = mongoose;

const dreamingCityRotationsSchema = new Schema({
    curseRotationIndex: Number,
    ascendantChallengeIndex: Number
});

mongoose.model('dreamingCityRotations', dreamingCityRotationsSchema, 'dreamingCityRotations');
