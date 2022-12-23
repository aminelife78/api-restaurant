const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const app = express();

if (process.env.NODE_ENV === "undefined") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//les routes
const routeCategories = require("./routes/categories.routes");

app.get("/", (req, res) => {
  res.send("voici mon site restaurant AHMED-ZEYD");
});
console.log(process.env.JAWSDB_URL)

app.use(routeCategories);

// port recuperer depuis config.env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
