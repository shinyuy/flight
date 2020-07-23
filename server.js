const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const formidable = require("express-formidable");
require("dotenv").config();
const app = express();  
var cors = require('cors');
app.use(cors());
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');

//Models
const Flight = require("./models/Flight");
const User = require("./models/user");

// Middlewares
const { auth } = require('./middlewares/auth');
const { admin } = require('./middlewares/admin');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const dbRoute ="mongodb://microapp:microapp1@ds119606.mlab.com:19606/microapp" //process.env.DB;
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
db.on("error", console.error.bind(console, "Mongo DB connection error:"));




 /***************************************
 //      Flights                         //
 **************************************/

app.get("/flights", (req, res) => {
  Flight.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(200).json({ success: true, flights: data });
  });
});


app.post("/images/uploadimage", formidable(), (req, res) => {
  cloudinary.uploader.upload(req.files.file.path, (error, result) => {
    console.log(error, result);
    res.status(200).send({
      public_id: result.public_id,
      url: result.url,
    });
  });
});

app.get("/images/removeimage", (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send("Okay");
  });
});

app.get("/flight/:id", (req, res) => {
    let id = req.params.id;
    
  Flight.findById(id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(200).json({ success: true, flight: data });
  });
});

app.post("/flights", (req, res) => {
  console.log(req.body)
  let flight = new Flight(req.body);
  flight.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(200).json({ success: true });
  }); 
});

app.put("/flights", (req, res) => {});

app.delete("/flights", (req, res) => {
  console.log(req.body.id);
  const { id } = req.body;
  Flight.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

 /***************************************
 //      Users                         //
 **************************************/
 
app.get('/auth', auth, (req, res)=>{
  res.status(200).json({
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      role: req.user.role
  }) 
}); 
 
 app.post("/register", (req, res) => {
   const user = new User(req.body);
   user.save((err, doc) => {
     if (err) return res.json({ success: false, err });
     res.status(200).json({
       success: true,
       userData: doc
     });
   });
 }); 

 app.post("/login", (req, res) => {
  //Find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      });

    //Grab the password and check
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong Password or Email"
        });

      //Generate a new token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
  });
})

app.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT | 5000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
