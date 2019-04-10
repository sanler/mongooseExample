const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exampleApp');

const User=require('./models/User.js');
const Cat=require('./models/Cat.js');

User.create({ name: 'Alice', password:"ironhack2018", job: 'Architect' }, function (err, user) {
    if (err) {
        console.log('An error happened:', err);
    } else {
        console.log('The user is saved and its value is: ', user);
    }
  });


Cat.create({name:'Misifu', color:'orange', age:2},function(err,cat){

    if(err){

      console.log('An error happened:', err);


    }else{

      console.log('The Cat is saved and its name is:', cat);
    }

});
 
  
  // The same code as above but with a Promise version
  
  /*
  
  User.create({ name: 'Alice', password:"ironhack2018", job: 'Architect' })
    .then(user => { console.log('The user is saved and its value is: ', user) })
    .catch(err => { console.log('An error happened:', err) });

  */  