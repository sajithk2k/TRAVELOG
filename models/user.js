var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    yourname: String,
    email: String,
    phone: String,
    username: String,
    password: String,

    places: [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Place"
		}
    ]
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);