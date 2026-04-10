const saveMovie = (req, res, next) => {
  const { title, director, year } = req.body;

  if (!title || !director || !year) {
    return res.status(400).json({ error: 'Missing required movie fields' });
  }

  next();
};

const saveReview = (req, res, next) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  if (!comment) {
    return res.status(400).json({ error: 'Comment is required' });
  }

  next();
};

module.exports = {
  saveMovie,
  saveReview
};