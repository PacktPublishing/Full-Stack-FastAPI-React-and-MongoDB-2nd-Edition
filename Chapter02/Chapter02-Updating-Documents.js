db.movies.updateOne(
  { genres: "Test" },
  { $set: { "genres.$": "PlaceHolder" } }
)


db.movies.updateMany(
  { "genres": "Test" },
  { 
    $set: { "genres.$": "PlaceHolder" },
    $inc: { "year": 1 }
  }
)
