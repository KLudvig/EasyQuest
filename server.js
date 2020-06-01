//Add Express, Mongoose etc.
const express = require("express");
const app = express();
const port = process.env.port || 3000; 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Survey = require("./api/models/survey"); 
require("dotenv").config();

//Import routes
const survey = require("./api/routes/survey"); 
const home = require("./api/routes/home");
const statistics = require("./api/routes/statistics");

app.set('view engine', 'ejs'); //Tells node to use ejs as view engine
app.use('/', express.static(__dirname + '/public')); //Makes static files usable from the public folder
app.use(express.json()); 
app.use(bodyParser.urlencoded())
app.use("/survey", survey); //Routing
app.use("/home", home);
app.use("/statistics", statistics);

//Connect to MongoDB and check if database is connected
const url = process.env.MONGO_DB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('connection error:', err)
})

//Route for the root. Renders home view and loads all surveys from database
app.get("/", (req, res) => { 
  Survey.find() 
  .then((result)=>{
res.render('home', {data: {survey: result}}) //because we are using EJS Node automatically looks into the views folder. No need to specify the path.
  })
  .catch((err)=> console.log(err))
  }); 
 
//Run on environment port or 4444
app.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Running on port ${port}`);
});
