const mongoose = require('mongoose');
const { Schema } = mongoose;

const destinationRotationsSchema = new Schema({
    name: String,
    id: Number
});

mongoose.model('destinationRotations', destinationRotationsSchema, 'destinationRotations');
