const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exampleApp');

/****************CONNECTION EVENTS**************/

//You can replace on by once to execute the callback only the first time the event happens.
// When successfully connected

mongoose.connection.on('connected', () => {  
    console.log('Mongoose default connection open');
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error', (err) => {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {  
    console.log('Mongoose default connection disconnected'); 
  });
  
  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 


/****************CONNECTION EVENTS**************/

/****************PROMISES**********************/

let Student = mongoose.model('Student', { firstname: String});
let City = mongoose.model('City', { name: String });

let promise1 = Student.insertMany([{ firstname: 'Alice' }, { firstname: 'Bob' }]);
let promise2 = City.insertMany([{ name: 'Madrid' }, { name: 'Barcelone' }, { name: 'Paris' }]);

Promise.all([promise1, promise2])
  .then(values => { 
    console.log("students and cities has been inserted");
    console.log(values);
    /*
    [ [ { _id: 5a4e462048841e65562c465a, firstname: 'Alice', __v: 0 },
      { _id: 5a4e462048841e65562c465b, firstname: 'Bob', __v: 0 } ],
    [ { _id: 5a4e462048841e65562c465c, name: 'Madrid', __v: 0 },
      { _id: 5a4e462048841e65562c465d, name: 'Barcelone', __v: 0 },
      { _id: 5a4e462048841e65562c465e, name: 'Paris', __v: 0 } ] ]
    */
    mongoose.connection.close();
  })
  .catch(err => console.error(err));

/*Example using a callback

MyModel.find({}, function(err, results) {  
  if (err) {
    console.log("An error happened:" + err);
    return;
  }
  console.log("This is all the results found", results)
});
Example using the Promise returned by MyModel.find()

MyModel.find({})  
  .then((results) => {
    console.log("This is all the results found", results)
  })
  .catch((err) => {
    console.log("An error happened:" + err);
  });
:bulb: We often use Promises with the following syntax:

myPromise
  .then(successCallback)
  .catch(failureCallback)*/

/****************PROMISES***********************/

const Cat = mongoose.model('Cat', { name: String });

function addNewCat(catName) {
    const kitty = new Cat({ name: catName });
    kitty.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`meow! ${catName} SAVED.`);
      }
    });
  }
  
  function showCats() {
    console.log('All the CATS!');
    Cat.find({}, (err, cats) => {
      cats.forEach((cat)=> {
        console.log(' --> cat: ', cat.name);
      })
    });
  }
  
  function addTenCats(){
    for (let i=0; i<10; i++){
      addNewCat(`Ironhacker ${i}`);
    }
  }
  
  addTenCats();
  

  /* We have to wait for our cats to save before displaying them
   Remember, it's async */
  setTimeout(showCats, 1500);