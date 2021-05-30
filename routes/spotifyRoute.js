const { Router } = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const config = require("../config");

function spotifyRoute(app) {
  const router = Router();
  app.use("/spotify", router);

  router.post("/initial-data", async (req, res) => {
    const { accessToken } = req.body;
    const spotifyApi = new SpotifyWebApi({
      clientId: config.spotifyClientKey,
      clientSecret: config.spotifySecretKey,
      accessToken,
    });

    try {
      const initialPromises = [
        spotifyApi.getUserPlaylists(),
        spotifyApi.getFeaturedPlaylists({ country: "US" }),
        spotifyApi.getNewReleases({ country: "US" }),
      ];

      const [userPlaylists, featuredPlaylists, newReleases] = await Promise.all(
        initialPromises
      );

      res.json({
        userPlaylists: userPlaylists.body.items,
        featuredPlaylists: featuredPlaylists.body,
        newReleases: newReleases.body.albums,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
}

module.exports = {
  spotifyRoute,
};
