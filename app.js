var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Place = require("./models/place");

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect("mongodb://localhost/travelog");

    var data=[
        {name:"Delhi",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type:"visited",
        date:"14-APR-2020"
        },
        {name:"Chennai",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type:"bucket",
        date:"15-JAN-2018"
        },
        {name:"Mumbai",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type:"visited",
        date:"21-JUN-2015"
        },
        {name:"Bangalore",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type:"bucket",
        date:"28-DEc-2008"
        },
        {name:"Hyderabad",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type:"visited",
        date:"14-OCT-2014"
        }
    ]

    
app.use(express.static(__dirname +"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

seedDB();
function seedDB(){
    Place.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        data.forEach(function(newPlace){
            Place.create(newPlace, function(err, addedPlace){
                if(err){
                    console.log(err);
                } else{
                    console.log("Added a place");
                }
            });
        });
    });
}

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

//NEW-Add a new place  
app.get("/places/new",function(req,res){
    res.render("new");
});


app.listen(3000,function(){
    console.log("TRAVELOG Server has started");
});
