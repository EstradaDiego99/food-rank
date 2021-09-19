function createExpectedPlayerProbability(ratingDifference) {
  const exponent = ratingDifference / process.env.SCALE_FACTOR;

  return 1 / (1 + Math.pow(process.env.EXPONENT_BASE, exponent));
}

exports.createPlayerProbabilities = function (playerARating, playerBRating) {
  const ratingADifference = playerBRating - playerARating;
  const ratingBDifference = playerARating - playerBRating;

  const playerAProbability = createExpectedPlayerProbability(ratingADifference);
  const playerBProbability = createExpectedPlayerProbability(ratingBDifference);

  return {
    playerAProbability,
    playerBProbability,
  };
};

exports.getNextRating = function (playerRating, score, playerProbability) {
  const change = Math.round(process.env.K_FACTOR * (score - playerProbability));
  const nextRating = playerRating + change;

  return nextRating;
};
