var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    info: String,
    type: String,
    date: String
});

module.exports = mongoose.model("Place",placeSchema);