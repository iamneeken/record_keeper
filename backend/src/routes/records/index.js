const records_router = require("express").Router();
const prisma = require("../../../prisma/instance");
const {recordValidator} = require("../../validation/records");
const {validationResult} = require("express-validator");

records_router.get("/", async (req, res) => {
  let allRecords = await prisma.items.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  });
  res.render("index", {records: allRecords})
});

records_router.post("/create", recordValidator, async (req, res) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("index", {errors: errors.array()});
    }

    const body = req.body;
    let record = await prisma.items.create({
      data: {
        name: body.name,
        quantity: body.quantity,
        price: body.price,
        additionalInfo: body.additionalInfo || null
      }
    });
    req.flash("success", `${record.name} added successfully.`);
  } catch (e) {
    console.log(e);
    req.flash("error", "Error while adding new record.");
  }
  return res.redirect("/");
});

records_router.post("/update", recordValidator, async (req, res) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("index", {errors: errors.array()});
    }

    const body = req.body;
    const query = req.query;
    let record = await prisma.items.update({
      data: {
        name: body.name,
        quantity: body.quantity,
        price: body.price,
        additionalInfo: body.additionalInfo || null
      },
      where: {
        id: query.id
      }
    });
    req.flash("success", `${record.name} update successfully.`);
  } catch (e) {
    console.log(e);
    req.flash("error", "Error while updating record.");
  }
  return res.redirect("/");
});

records_router.post("/delete", async (req, res) => {
  try {
    const query = req.query;
    let record = await prisma.items.delete({
      where: {
        id: query.id
      }
    });
    req.flash("success", `${record.name} deleted successfully.`)
  } catch (e) {
    console.log(e);
    req.flash("error", "Error while deleting record.");
  }
  res.redirect("/");
});

module.exports = records_router;