// requesting the function from iss.js file
const { nextISSTimesForMyLocation } = require('./iss');
const { printPastTimes } = require('./pastTimes');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('Fail!', error);
  }

  // if success - will print out the details
  printPastTimes(passTimes);
});

