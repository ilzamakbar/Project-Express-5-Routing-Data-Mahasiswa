const express = require("express");
const router = express.Router();
const {
  getAllData,
  getDataById,
  getDataByNim,

  createData
} = require("../controllers/data.controller");

router.get("/", getAllData);
router.get("/:id", getDataById);
router.get("/nim/:nim", getDataByNim);
router.post("/", createData);

module.exports = router;