const records_router = require("express").Router();

records_router.use("/", (req, res) => {
  res.render("index", {name: "manil"})
})

module.exports = records_router;