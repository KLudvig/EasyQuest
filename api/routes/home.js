const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Survey = require("../models/survey"); 

//Save new survey to database
router
  .route("/addSurvey/:name") 
  .get((req, res) => { 
    const survey = new Survey({
      name: req.params.name,
    });
    survey.save()
    res.end();
  })

//Save new question to database
router
.route("/addSurvey/saveQ") 
.post((req, res) => { 
  Survey.findOneAndUpdate({name: req.body.survey}, {$push: {questions: {name: req.body.question,
  answer1: {answer: req.body.ans1, score: 0},
  answer2: {answer: req.body.ans2, score: 0},
  answer3: {answer: req.body.ans3, score: 0}}}})
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
  res.end();
  })

  //Delete survey from database
  router
  .route("/deleteSurvey")
  .delete((req, res) => {
    Survey.deleteOne({_id: req.body.survey})
    .then((result) => console.log('deleted: ' + req.body.survey + ' from database'))
    .catch((err) => console.log(err))
    res.end();
  })


  module.exports = router; //export our router