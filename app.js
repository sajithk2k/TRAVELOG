var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport=require("passport"),
	LocalStrategy=require("passport-local"),
    methodOverride = require("method-override"),
    Place = require("./models/place"),
    User = require("./models/user");

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect("mongodb://localhost/travelog");

    // var data=[
    //     {name:"Delhi",
    //     image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
    //     info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     isVisited: true,
    //     date:"14-APR-2020"
    //     },
    //     {name:"Chennai",
    //     image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
    //     info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     isBucket: true,
    //     date:"15-JAN-2018"
    //     },
    //     {name:"Mumbai",
    //     image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
    //     info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     isVisited: true,
    //     date:"21-JUN-2015"
    //     },
    //     {name:"Bangalore",
    //     image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
    //     info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     isBucket: true,
    //     date:"28-DEC-2008"
    //     },
    //     {name:"Hyderabad",
    //     image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
    //     info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     isVisited: true,
    //     date:"14-OCT-2014"
    //     }
    // ]

    
app.use(express.static(__dirname +"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.use(require("express-session")({
	secret: "I am the one who knocks-Walter White",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


// seedDB();
// function seedDB(){
//     Place.deleteMany({},function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds");
//         data.forEach(function(newPlace){
//             Place.create(newPlace, function(err, addedPlace){
//                 if(err){
//                     console.log(err);
//                 } else{
//                     console.log("Added a place");
//                 }
//             });
//         });
//     });
// }

app.get("/",function(req,res){
    res.render("entry");
});

//SHOW-Shows all visited places(default)
app.get("/places",function(req,res){
	Place.find({},function(err,allPlaces){
		if(err){
			console.log(err);
		} else{
			res.render("visited",{places:allPlaces});
		}
	});
});

//BUCKET-Shows all bucket list places
app.get("/places/bucket",function(req,res){
	Place.find({},function(err,allPlaces){
		if(err){
			console.log(err);
		} else{
			res.render("bucket",{places:allPlaces});
		}
	});
});

//NEW-Renders form to create a new place
app.get("/places/new",function(req,res){
    res.render("new");
});

//CREATE-Add a new place to DB
app.post("/places",function(req,res){
    var name = req.body.name,
        image = req.body.image,
        info = req.body.info,
        isVisited = req.body.isVisited,
        isBucket = req.body.isBucket,
        date = req.body.date;

    var newPlace = {
                    name: name,
                    image: image,
                    info: info,
                    isVisited: isVisited,
                    isBucket: isBucket,
                    date: date
    }

    Place.create(newPlace, function(err, newlyCreated){
		if(err)
		{
			console.log(err)
		}else{
			res.redirect("/places");
		}
	});
});

//VIEW AND EDIT FORM
app.get("/places/:id/show",  function(req,res){
		
    Place.findById(req.params.id,function(err, foundPlace){
            res.render("show",{place: foundPlace});
            });
    });

//UPDATE PLACE 
app.put("/places/:id", function(req,res){
    
    req.body.place.isVisited=Boolean(req.body.place.isVisited);
    req.body.place.isBucket=Boolean(req.body.place.isBucket);
    console.log(req.body.place);
	Place.findByIdAndUpdate(req.params.id,req.body.place,function(err,editedPlace){
		if(err){
            console.log(err);
			res.redirect("/places");
		} else{
            res.redirect("/places");
            console.log(editedPlace);
		}
	});
});

//REGISTER ROUTE
app.post("/register",function(req,res){
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
app.post("/login",passport.authenticate("local",
	{
		successRedirect: "/places",
		failureRedirect: "/"
	}), function(req,res){
});

//LOGOUT ROUTE
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

app.listen(3000,function(){
    console.log("TRAVELOG Server has started");
});
