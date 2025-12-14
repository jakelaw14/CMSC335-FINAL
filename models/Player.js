const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    idNumber: Number,
    name: String,
    position: String,
    height: String,
    weight: String,
    team: String
});

module.exports = mongoose.model("Player", PlayerSchema);
