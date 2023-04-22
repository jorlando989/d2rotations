const mongoose = require('mongoose');
const { Schema } = mongoose;

const terminalOverloadSchema = new Schema({
    currentLocation: Number
});

mongoose.model('terminalOverload', terminalOverloadSchema, 'terminalOverload');
