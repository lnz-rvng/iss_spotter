const request = require('request-promise-native');

const fetchMyIP = () => {
  const ipify = 'https://api.ipify.org?format=json';

  // use request to fetch IP address from JSON API
  return request(ipify);
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  const ipwhois = `http://ipwho.is/${ip}`;

  // use request to fetch coordinates from JSON API
  return request(ipwhois);
  
};

const fetchISSFlyOverTimes = (body) => {
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };