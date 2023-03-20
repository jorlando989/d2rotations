const mongoose = require('mongoose');
const { Schema } = mongoose;

const nightfallWeaponSchema = new Schema({
    nightfallWeaponIndex: Number
});

mongoose.model('nightfallWeaponRotation', nightfallWeaponSchema, 'nightfallWeaponRotation');
