const express = require("express");
let router = express.Router();
const mongoose = require('mongoose');
const Survey = require("../models/survey");

//Render statistics view and load object data with the correct ID from MongoDB
router
  .route("/:id") 
  .get((req, res) => {
    Survey.findOne({_id: req.params.id }) 
    .then((result)=>{
      console.log(result)
  res.render('statistics', {data: {survey: result}}) 
})
    .catch((err)=> {
      console.log(err)
      res.send('There was an error') 
    })
  });
  
module.exports = router; //export our router