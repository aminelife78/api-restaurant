const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const globalError = require("./middlewares/errorMidlleware");
const apiError = require("./utils/apiError");

dotenv.config({ path: "config.env" });
const app = express();

if (process.env.NODE_ENV === "undefined") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//require routes
const routeCategories = require("./routes/categories.routes");
const routePlats = require("./routes/plats.routes");

app.get("/", (req, res) => {
  res.send("voici mon site restaurant AHMED-ZEYD");
});


//  routes middleware

app.use("/api/v1/categories",routeCategories);
app.use("/api/v1/plats",routePlats);




// create l'erreur avec apiError si le route n'existe pas!
app.all("*", (req, res, next) => {
  next(new apiError(`can't find this route${req.originalUrl}`, 400));
});

// global error handiling middleware for express
app.use(globalError);


// port recuperer depuis config.env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));

// handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection error: ${err.name} ${err.message}`);
});
