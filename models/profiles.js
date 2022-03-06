const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profile_schema = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, require: true, default: 0 },
    addres: { type: String, require: true },
    image: { type: String, require:true },
    cv: { type: String, require:true , unique:true}
});

const profiles = mongoose.model("profiles", profile_schema);
module.exports = profiles;