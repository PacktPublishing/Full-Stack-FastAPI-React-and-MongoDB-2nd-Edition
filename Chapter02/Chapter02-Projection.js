db.movies.find(
  {
    "year": { $gt: 1945 },
    "countries": "USA",
    "genres": "Comedy"
  },
  {
    "_id": 0,
    "title": 1,
    "countries": 1,
    "year": 1
  }
).sort({ "year": 1 }).limit(5)
