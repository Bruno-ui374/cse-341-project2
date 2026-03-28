const reviewRules = {
  movieId: 'required|string',
  reviewer: 'required|string|max:100',
  comment: 'required|string',
  score: 'required|numeric|min:1|max:10'
};

module.exports = reviewRules;