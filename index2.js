const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPastTimes } = require('./pastTimes');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPastTimes(passTimes);
  })
  .catch((error) => {
    console.log('Fail!', error.message);
  });
