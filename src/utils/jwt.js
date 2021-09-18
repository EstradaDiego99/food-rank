const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "fnjngnadskahuwibaiujbriabwemcdkfsnf";

exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    dishesElo: user.dishesElo,
    createToken: moment().unix,
    exp: moment().add(3, "hours").unix,
  };
  return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };
  return jwt.encode(payload, SECRET_KEY);
};

exports.decodeToken = function (token) {
  return jwt.decode(token, SECRET_KEY);
};
