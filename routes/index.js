////////////////////////////////////////////////////////////////////////
//                              express                               //
////////////////////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();

////////////////////////////////////////////////////////////////////////
//                              mongoose                              //
////////////////////////////////////////////////////////////////////////

  ///////////////
  //  require  //
  ///////////////

const mongoose = require('mongoose');
const db = mongoose.connection;

 ////////////////////////
 //  test kittySchema  //
 ////////////////////////

const kittySchema = new mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function() {
  let greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

const Kitten = mongoose.model('kitten', kittySchema);


let silence = new Kitten({ name: 'Silence' })
console.log(silence.name);

let fluffy = new Kitten({ name: 'fluffy' });

fluffy.save(function(err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

 ///////////////////////////////
 //  connection with databse  //
 ///////////////////////////////
 

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
});

///////////////
//  request  //
///////////////


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
