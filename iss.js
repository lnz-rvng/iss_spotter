const request = require('request');

const nextISSTimesForMyLocation = (cb) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return cb(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return cb(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return cb(error, null);
        }

        cb(null, nextPasses);
      });
    });
  });
};

const fetchMyIP = function(cb) {

  // save the url to a variable
  const ipify = 'https://api.ipify.org?format=json';

  // use request to fetch IP address from JSON API
  request(ipify, (error, response, body) => {

    // if the url is invalid
    if (error) return cb(error.message, null);

    // if there's an error fetching the data
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }

    // parsing the JSON
    const ip = JSON.parse(body).ip;
    cb(null, ip);
  });
};

const fetchCoordsByIP = (ip, cb) => {

  // save the url to a variable
  const ipwhois = `http://ipwho.is/${ip}`;

  // use request to fetch coordinates from JSON API
  request(ipwhois, (error, response, body) => {

    // if the url is invalid
    if (error) return cb(error.message, null);

    const parsedBody = JSON.parse(body);

    // the ip address is invalid
    if (!parsedBody.success) {
      const msg = `Status was ${parsedBody.success}. ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      cb(Error(msg), null);
      return;
    }

    const latitude = parsedBody.latitude;
    const longitude = parsedBody.longitude;
    
    cb(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = (coords, cb) => {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) return cb(error.message, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      cb(Error(msg), null);
      return;
    }

    const parsedData = JSON.parse(body).response;
    cb(null, parsedData);
  });
};


module.exports = { nextISSTimesForMyLocation };