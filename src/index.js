require('dotenv').config()
const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const records_router = require("./routes/records");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

nunjucks.configure(path.join(__dirname, '..', 'views'), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV === "development"
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "njk"); // add extension of a file. ("njk", ".njk") both are fine
app.use('/public', express.static(path.join(__dirname, '..', 'public'), { index: false }));
app.use(session({
  cookie: { maxAge: 900000 },
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// adding global template variable which can be accessed in template rendering
app.use((req, res, next) => {
  res.locals.flash = (name) => req.flash(name);
  res.locals.log = (arg) => console.log(arg)
  next();
})


app.use("/", records_router);

const server = app.listen(process.env.port, () => {
  console.log(`Listening on url: localhost:${server.address().port}`);
})