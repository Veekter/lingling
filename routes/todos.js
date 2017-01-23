var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

//Create the Databse Object using  the Databse dirvers provided by my mlab account
var db = mongojs('mongodb://todos:todos@ds127399.mlab.com:27399/mytodos',['todos']);

// Get all the todos
router.get('/', function(req, res, next){
  db.todos.find({}, function(err, todos){
    if(err){
      console.log("Error connecting to the mlab database: " + err);
      res.send(err);
    }
    else{
      res.json(todos);
      console.log('Connection to mlab database successful!');
    }
  });
});

//Get a single todo task
router.get('/todo/:id', function(req, res, next){
  db.todos.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, todo){
    if(err){
      console.log("Error connecting to the mlab database: " + err);
      res.send(err);
    }
    else{
      res.json(todo);
      console.log('Single document successfully retrieved my nigga');
    }
  });
});

//Save a Todo task
router.post('/', function(req, res, next){
  var todo = req.body;
  if(!todo.title || !(todo.isDone + '')){
    res.status(404);
    res.json({'error': "Bad Data My Nigga"});
  } else{
    db.todos.save(todo, function(err, todo){
      if(err){
        console.log("Error saving document to collection in database: "+ err);
        res.send(err);
      }
      else{
        res.json(todo);
        console.log('Document Successfully saved to Databse my nigga');
      }
    });
  }

});

//Delete a todo task
router.delete('/todo/:id', function(req, res, next){
  db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, todo){
    if(err){
      console.log("Error deleting from the mlab database: " + err);
      res.send(err);
    }
    else{
      res.json(todo);
      console.log('Single document successfully deleted my nigga');
    }
  });
});

//Update a todo task
router.put('/todo/:id', function(req, res, next){
  var todo = req.body;
  var updtodo ={};
  if(todo.isDone && todo.title){
    updtodo.isDone = todo.isDone;
    updtodo.title = todo.title;
  }
  if(!updtodo){
    res.send(404);
    res.json({'error': "Bad Data my Nigga"});
    console.log('Error getting data from put request');
  } else{
    db.todos.update({_id: mongojs.ObjectId(req.params.id)},updtodo,{}, function(err, todo){
      if(err){
        console.log("Error updating todo task in the mlab database: " + err);
        res.send(err);
      }
      else{
        res.json(todo);
        console.log('Single document successfully updated my nigga');
      }
    });

  }
});

module.exports = router;
