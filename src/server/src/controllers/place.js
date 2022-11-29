const { getPlacesForTypes } = require("../utils/typesPlaces")

exports.getPlaces = async (req, res) => {
  try {
    let placesResponse = getPlacesForTypes(test)
    let placesResult = await Promise.all(placesResponse);

    if (placesResult[0].error_message) {
      const error = placesResult[0]
      return res.status(500).json({error})
    } else {
      const data = placesResult.flat()
      res.json({data})
    }
  } catch (error) {
    return res.status(500).json({error})
  }
}

const test = [
  "movie_theater",
  "amusement_park"
]

// const funActivities = [
//   "amusement_park",  
//   "bowling_alley",
//   "park",
//   "shopping_mall",
//   "tourist_attraction",
//   "zoo",
// ]

// const relaxingDay = [
//   "aquarium",
//   "art_gallery",
//   "movie_theater",
//   "museum",
//   "spa",
// ]

// const nightLife = [
//   "bowling_alley",
//   "casino",
//   "night_club",
//   "bar",
// ]

// const food = [
//   "bar",
//   "cafe",
//   "meal_takeaway",
//   "restaurant",
// ]

