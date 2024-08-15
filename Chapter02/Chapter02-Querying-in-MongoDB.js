db.movies.find()

db.movies.find({"year": 1969}).limit(5)

db.movies.countDocuments({"year": 1969})

db.movies.find({"year": {$gt: 1945}, "countries": "USA", "genres": "Comedy"})

db.movies.countDocuments({"year": {$gt: 1945}, "countries": "USA", "genres": "Comedy"})

