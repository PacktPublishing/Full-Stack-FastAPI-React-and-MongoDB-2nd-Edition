db.movies.aggregate([{$match: {"genres": "Comedy"}}])

db.movies.aggregate([
  {
    $match: {
      type: "movie",
      genres: "Comedy"
    }
  },
  {
    $group: {
      _id: null,
      averageRuntime: { $avg: "$runtime" }
    }
  }
])
