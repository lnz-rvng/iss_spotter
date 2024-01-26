const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPastTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPastTimes(passTimes);
  })
  .catch((error) => {
    console.log('Fail!', error.message);
  });
