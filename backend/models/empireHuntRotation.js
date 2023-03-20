const mongoose = require('mongoose');
const { Schema } = mongoose;

const empireHuntSchema = new Schema({
    empireHuntIndex: Number
});

mongoose.model('empireHuntRotation', empireHuntSchema, 'empireHuntRotation');
