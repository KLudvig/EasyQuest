const mongoose = require('mongoose');

const Schema = mongoose.Schema
const surveySchema = new Schema({
  name: String,
  questions: [{
    name: String,
    answer1: {answer: String, score: Number},
    answer2: {answer: String, score: Number},
    answer3: {answer: String, score: Number},
  }]
}, {collection: 'survey'}) 

module.exports = mongoose.model('Survey', surveySchema)