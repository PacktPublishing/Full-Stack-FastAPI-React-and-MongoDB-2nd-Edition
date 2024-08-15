db.movies.insertOne({
  title: "Once upon a time on Moon",
  genres: ["Test"],
  year: 2024
})


db.movies.insertMany([
  {
    title: "Once upon a time on Moon",
    genres: ["Test"],
    year: 2024
  },
  {
    title: "Once upon a time on Mars",
    genres: ["Test"],
    year: 2023
  },
  {
    title: "Tiger Force in Paradise",
    genres: ["Test"],
    year: 2019,
    rating: "G"
  }
])

