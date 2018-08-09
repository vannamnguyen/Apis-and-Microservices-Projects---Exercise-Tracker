const mongoose = require('mongoose');

const Exercise = require('../models/exerciseModel').Exercise;
const User = require('../models/userModel').User;

const addExercise = (req,res) => {
  
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const date = Date.parse(Date(req.body.date));
  
  
  
  User.findById((userId), (err, user) => {
    if(err){
      res.send(err);
    } else {
      
      const exercise = {
        user: user.id,
        description: description,
        duration: duration,
        date: date,
      }
      
      Exercise.create(exercise, (err, data) => {
        
        if(err){
          res.send(err);
        } else {
          
          res.json(data);
        }
      })
    }
  })            
}

const searchExercise = (req,res) => {
  
  const user = req.query.userId;
  let from = Date.parse(Date(req.query.from));
  let to = Date.parse(Date(req.query.to));
  let limit = req.query.limit;
  
  console.log(req.query);
  console.log(from);
  console.log(to);
  
  Exercise.find({user: user, date: { $gt: 10, $lt: 1533735608000}}, (err, exercises) => {
    if(err){
      res.send(err);
    } else {
      res.json(exercises);
    }
  })
  

}

module.exports = {

  addExercise: addExercise,
  searchExercise: searchExercise

}