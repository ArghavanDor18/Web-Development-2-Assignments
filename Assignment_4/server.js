const express = require("express");
const app = express();

const https = require("https");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('./public'));

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})

// app.get('/', function (req, res) {
//     res.send('<h1> GET request to homepage </h1>')    
// })
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/timelineDB",
    { useNewUrlParser: true, useUnifiedTopology: true });
const eventSchema = new mongoose.Schema({
    text: String,
    hits: Number,
    time: String
});
const eventModel = mongoose.model("timelineevents", eventSchema);



app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));
// R
app.get('/timeline/getAllEvents', function (req, res) {
    console.log(req.body)
    eventModel.find({}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})
//C
app.put('/timeline/insert', function (req, res) {
    eventModel.create({
        text: req.body.text,
        time: req.body.time,
        hits: req.body.hits
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Insertion is successful");
    });
})
//U
app.get('/timeline/increaseHits/:id', function (req, res) {
    console.log(req.body)
    eventModel.updateOne({
       _id : req.body.id
    }, {
        $inc : { hits: 1}
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Update is good!");
    });
})
//D
app.get('/timeline/deleteOne/:id', function (req, res) {
    console.log(req.params)
    eventModel.deleteOne({
       _id : req.params.id

    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Delete is good!");
    });
})


app.get('/profile/:id', function (req, res) {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = "";
    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })
        https_res.on("end", function () {
            data = JSON.parse(data)

            tmp = data.stats.filter((obj_)=>{
                return obj_.stat.name == "hp"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "hp": tmp[0],
                "type": data.types[0].type.name
            });
        })
    });



})


var session = require('express-session');
//const { json } = require('express/lib/response');

// Use the session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));



//function logger1 (req, res, next){
 //   console.log("logger1 got executed!")
 //   next()
//}

//function logger2 (req, res, next){
 //   console.log("logger2 got executed!")
//    next()
//}

//function logger3 (req, res, next){
 //   console.log("logger3 got executed!")
  //  next()
//}
// how to declare a global middleware
//app.use(logger2)
//app.use(logger1)



users = [
    {
        username: "user1",
        password: "pass1",
        shoppingCart: [
            {
                pokeID: 25,
                price: 12,
                quantity: 2
            },{

                pokeID: 35,
                price: 12,
                quantity: 4
            }
        ]
    },{

        username: "user2",
        password: "pass2"
    }
]
console.log(users[0].password)

function auth(req, res, next){
    //console.log(req.session.authenticated)
    if (req.session.authenticated){
        console.log("/ home route got triggered!")
        next()
    //res.redirect('/userProfile/:name')
    //body = JSON.stringify(req.body)
    //console.log(req.body)
  
      return
    } else {
        req.session.authenticated = false
        res.redirect("/login")
        
    }
    
    //next()
      
    //return    
    
    //}else {
      //  res.redirect('/login')
    //}
//res.end()
}

app.get('/', (req, res)=>{
   if(req.session.authenticated) {
       res.sendFile(__dirname + '/public/userprofile.html')
    }else{
        res.sendFile(__dirname + '/public/login.html')
    }
  // res.render('/login.ejs')
  
})

app.get('/login/', function (req, res) {
    res.sendFile(__dirname + '/public/login.html')
  //  res.render("login.ejs")

})


app.post('/login/', function (req, res) {
    //res.send("Please provide the credentials through the URL")
   console.log(req.body)
     if (
        users.filter(
                user => user.username == req.body.username
            )[0].password == req.body.password
    ) {
        
        //if ((users[0].username == req.body.username) && (users[0].password == req.body.password)) {
            req.session.authenticated = true
            req.session.user = req.body.username
            console.log("successful login")
            res.redirect(`/userInfo/${req.session.user}`)
            
    
    
}
})

app.get('/userInfo/:username', function(req, res){
    username = req.session.username;

    user = users[users.indexOf(username)], (err, user) => {
        if (err){
            console.log(err);
        }else{
            console.log(user)
            res.send(user)
        }
    }
})

//app.post('/login'), function (req, res){
    //req.session.user = req.body.username
    //req.session.pass = req.body.password
//}



//app.post('/',  function (req, res) {
 //   body = JSON.stringify(req.body)
 //   console.log(req.body)
  //console.log()
  
//  res.send("Welcome to the Home page!")

//}


//app.get('/userProfile/:name', function(req, res){
  //  tmp = ''
 //   tmp += `Welcome ${req.session.name}`
  //  tmp += JSON.stringify(users.filter(  x => x.username == req.session.name)[0].shoppingCart)
  //  console.log(tmp)
   // res.send(tmp)
//})



// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.html");
//   })



