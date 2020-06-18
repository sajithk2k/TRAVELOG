var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    info: String,
    isVisited:Boolean,
    isBucket:Boolean,
    date: String,
		username: String
});

module.exports = mongoose.model("Place",placeSchema);