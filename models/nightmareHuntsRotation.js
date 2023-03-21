const mongoose = require('mongoose');
const { Schema } = mongoose;

const nightmareHuntsSchema = new Schema({
    nightmareHuntsIndex: Number
});

mongoose.model('nightmareHuntsRotation', nightmareHuntsSchema, 'nightmareHuntsRotation');
