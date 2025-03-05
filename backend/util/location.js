const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDHy6axSbFPaOm3PJ6JdYoH-HmdKAen9sk";

async function getCoordsForAddress(address) {
  // return {
  //   lat: 20.270994,
  //   lng: 85.80958,
  // };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
