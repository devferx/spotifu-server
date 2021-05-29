const { Router } = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const config = require("../config");

function authRoute(app) {
  const router = Router();
  app.use("/auth", router);

  router.post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: config.redirectUri,
      clientId: config.spotifyClientKey,
      clientSecret: config.spotifySecretKey,
    });
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  });

  router.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: config.redirectUri,
      clientId: config.spotifyClientKey,
      clientSecret: config.spotifySecretKey,
      refreshToken,
    });

    spotifyApi
      .refreshAccessToken()
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch(function (err) {
        res.status(400);
      });
  });
}

module.exports = { authRoute };
