require("dotenv/config");

module.exports = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  apiKey: process.env.GOOGLE_MAPS_API_KEY
};