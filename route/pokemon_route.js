const express = require("express");
const router = express.Router();
const pokemonController = require("../controller/pokemon_controller");

router.get("/", pokemonController.findAll);
router.get("/:id", pokemonController.findById);

module.exports = router;
