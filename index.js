// requesting the function from iss.js file
const { nextISSTimesForMyLocation } = require('./iss');

const printPastTimes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('Fail!', error);
  }

  // if success - will print out the details
  printPastTimes(passTimes);
});