const express = require("express");
const cors = require("cors");

const { authRoute } = require("./routes/authRoute");
const { spotifyRoute } = require("./routes/spotifyRoute");

const config = require("./config");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
authRoute(app);
spotifyRoute(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, (err) => {
  if (err) console.log("Error:" + err);

  if (config.isDev) {
    console.log(`Server running on http://localhost:${config.port}`);
  }
});
