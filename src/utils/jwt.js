require("dotenv").config();

const jwt = require("jwt-simple");
const moment = require("moment");

exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    dishesElo: user.dishesElo,
    createToken: moment().unix,
    exp: moment().add(3, "hours").unix,
  };
  return jwt.encode(payload, process.env.AUTH_SECRET_KEY);
};

exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };
  return jwt.encode(payload, process.env.AUTH_SECRET_KEY);
};

exports.decodeToken = function (token) {
  return jwt.decode(token, process.env.AUTH_SECRET_KEY);
};
