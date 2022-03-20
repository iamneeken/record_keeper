require('dotenv').config()
const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const records_router = require("./records");

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


app.use("/", records_router);

const server = app.listen(process.env.port, () => {
  console.log(`Listening on url: localhost:${server.address().port}`);
})