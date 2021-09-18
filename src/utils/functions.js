/** Función para convertir de un objeto a un string query para URL */
function toQueryString(query) {
  return Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");
}

function createExpectedPlayerProbability(ratingDifference){
  const exponent = ratingDifference / process.env.SCALE_FACTOR;

  return 1 / (1 + Math.pow(process.env.EXPONENT_BASE,exponent));
}

function createPlayerProbabilities(playerARating,playerBRating){

  const ratingADifference = playerBRating - playerARating;
  const ratingBDifference = playerArating - playerBRating;

  const playerAProbability = createExpectedPlayerProbability(ratingADifference)
  const playerBProbability = createExpectedPlayerProbability(ratingBDifference)

  return {
    playerAProbability,
    playerBProbability
  }
}

function getNextRating(playerRating,score, playerProbability){

  const change = Math.round(process.env.K_FACTOR * (score - playerProbability));
  const nextRating = playerRating + change;

  return nextRating;

}


/** Converts string to JSON object if possible, if not returns string as it is */
function optionalStringToJSON(jsonString) {
  if (typeof jsonString !== "string") {
    throw new Error("This is not a valid string.");
  }
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return jsonString;
  }
}

/** Extraer los mensajes de error de un objeto estilo Error Mongoose */
function extraerMensajesError({ errors }) {
  const returnErrors = {};
  if (errors) {
    for (const [key, obj] of Object.entries(errors)) {
      returnErrors[key] = optionalStringToJSON(obj.message);
    }
  }
  return returnErrors;
}

module.exports = { toQueryString, optionalStringToJSON, extraerMensajesError };
