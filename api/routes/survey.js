const express = require("express");
let router = express.Router();
const mongoose = require('mongoose');
const Survey = require("../models/survey");
mongoose.set('useFindAndModify', false); // Needed to make Mongoose use `findOneAndUpdate()`

//Render a fillable survey for the respondent. 
router
  .route("/:id") 
  .get((req, res) => {
    console.log(req.params.id)
    Survey.findOne({_id: req.params.id}) 
    .then((result)=>{
  res.render('survey', {data: {survey: result}}) 
    })
    .catch((err)=> {
      console.log(err)
      res.send('Sorry, the page you are looking for does not exist:(') 
    })
  });

  //Save the respondents answers
  router
  .route("/save") 
  .post((req, res) => { 
    const bodyIterable = Object.values(req.body) //Get values from form submit and make it iterable
    for(let i = 1; i<bodyIterable.length; i++) { //Loop through the questions and increase each answers score by one, (i=1 because 0 is the ObjectId).
      let ObjectId = bodyIterable[0]  
      let questionKey = bodyIterable[i][0] 
      let questionAnswer = bodyIterable[i][1]
      let addScore = "questions.$."+questionAnswer+".score"
     Survey.findOneAndUpdate({_id: ObjectId, "questions._id": questionKey}, {$inc: {[addScore]: 1 } }, {new: true })
     .then()
     .catch((err)=>{err})
  }
    res.send(`<span style="font-weight: 600;margin-top: 80px;text-align: center;display: block;font-size: 45px;color: #33bdb0;">&#x2714</span>
      <span style="font-weight: 600;font-family: arial;margin-top: 30px;text-align: center;display: block;color: #333333;">Thank you for completing our survey!</span>`)
  })
  
module.exports = router; //export our router