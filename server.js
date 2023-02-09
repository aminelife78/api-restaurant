const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");


const app = express();
let session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const globalError = require("./middlewares/errorMidlleware");
const apiError = require("./utils/apiError");

dotenv.config({ path: "config.env" });

if (process.env.NODE_ENV === "undefined") {
  app.use(morgan("dev"));
}

//chemin statique
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//require routes
const routeCategories = require("./routes/categories.routes");
const routePlats = require("./routes/plats.routes");
const routeMenus = require("./routes/menus.routes");
const routeFormules = require("./routes/formules.routes");
const routeUsers = require("./routes/users.routes");
const routeAuth = require("./routes/auth.routes");
const routeGalerie = require("./routes/galerie.routes");
const routeHoraires = require("./routes/horaires_ouverture.routes");
const routeReservations = require("./routes/reservation.routes");
app.get("/", (req, res) => {
  res.send("application web restaurant Ahmed Kitchen");
});

//  routes middleware

app.use("/api/v1/categories", routeCategories);
app.use("/api/v1/plats", routePlats);
app.use("/api/v1/menus", routeMenus);
app.use("/api/v1/formules", routeFormules);
app.use("/api/v1/users", routeUsers);
app.use("/api/v1/auth", routeAuth);
app.use("/api/v1/galerie", routeGalerie);
app.use("/api/v1/horaires", routeHoraires);
app.use("/api/v1/reservations", routeReservations);

// create l'erreur avec apiError si le route n'existe pas!
app.all("*", (req, res, next) => {
  next(new apiError(`can't find this route${req.originalUrl}`, 400));
});

// global error handiling middleware for express
app.use(globalError);

// port recuperer depuis config.env
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`));

// handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection error: ${err.name} ${err.message}`);
});
