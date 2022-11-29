const {Client} = require("@googlemaps/google-maps-services-js");
const { apiKey } = require("../config");
const client = new Client({});

exports.getPlacesForTypes = (arr) => {
  return arr.map(async (type) => {
    return client
      .placesNearby({
        params: {
          location: [51.5072, -0.1276], //needs to be dynamic
          radius: 400, //metres
          type: type,
          key: apiKey,
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        return r.data.results;
      })
      .catch((e) => {
        return e.response.data
      });
  })
}