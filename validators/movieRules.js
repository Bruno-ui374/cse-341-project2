const movieRules = {
  title: 'required|string|max:100',
  year: 'required|numeric|min:1888',
  genre: 'required|string|max:50',
  director: 'required|string|max:100',
  duration: 'required|numeric|min:1',
  rating: 'required|numeric|min:1|max:10',
  description: 'required|string'
};

module.exports = movieRules;