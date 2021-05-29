require("dotenv").config();

module.exports = {
  isDev: process.env.NODE_ENV === "development",
  port: process.env.PORT || 3000,
};
