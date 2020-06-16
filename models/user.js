var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Userschema = new mongoose.Schema({
    username: String,
    password: String,

    places: [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Place"
		}
    ]
});


Userscheme.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);