var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//HOME ROUTE
router.get("/", isLoggedIn,function(req,res){
	res.redirect("/places")
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

router.get("/login",function(req,res){
	res.render("entry");
});
//LOGIN ROUTE
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/places",
		failureRedirect: "/"
	}), function(req,res){
});

router.get("/login",function(req,res){
	res.render("entry");
})

//LOGOUT ROUTE
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){	
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports = router;