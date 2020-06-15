var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser");

    var places=[
        {name:"Delhi",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        date:"14-APR-2020"
        },
        {name:"Delhi",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        date:"14-APR-2020"
        },
        {name:"Delhi",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        date:"14-APR-2020"
        },
        {name:"Delhi",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        date:"14-APR-2020"
        },
        {name:"Delhi",
        image:"https://www.incredibleindia.org/content/dam/incredible-india-v2/images/places/delhi/Original.jpg/jcr:content/renditions/cq5dam.web.256.256.jpeg",
        date:"14-APR-2020"
        }
    ]

    
app.use(express.static(__dirname +"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("entry");
});

app.get("/places",function(req,res){
    res.render("places",{places:places});
});

app.get("/places/new",function(req,res){
    res.render("new");
});

app.listen(3000,function(){
    console.log("TRAVELOG Server has started");
});
