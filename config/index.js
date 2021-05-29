require("dotenv").config();

module.exports = {
  isDev: process.env.NODE_ENV === "development",
  port: process.env.PORT || 3000,
  spotifyClientKey: process.env.SPOTIFY_CLIENT_KEY,
  spotifySecretKey: process.env.SPOTIFY_SECRET_KEY,
  redirectUri: process.env.REDIRECT_URI,
};
