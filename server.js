const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();

app.use(cors());

app.listen(config.port, (err) => {
  if (err) console.log("Error:" + err);

  if (config.isDev) {
    console.log(`Server running on http://localhost:${config.port}`);
  }
});
