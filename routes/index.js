var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//HOME ROUTE
router.get("/",function(req,res){
    res.render("entry");
});

//REGISTER ROUTE
router.post("/register",function(req,res){
    var newUser = new User({
        yourname: req.body.yourname,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
    });
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("entry");
		}
		passport.authenticate("local")(req ,res, function(){
            console.log(newUser);
            res.redirect("/places");
		});
	});
});

//LOGIN ROUTE
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/places",
		failureRedirect: "/"
	}), function(req,res){
});

//LOGOUT ROUTE
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});


module.exports = router;