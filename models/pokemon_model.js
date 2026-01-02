const sql = require("../db.js");

// constructor
const Pokemon = function (pokemon) {
  this.name = pokemon.name;
  this.base_experience = pokemon.base_experience;
  this.weight = pokemon.weight;
  this.image_path = pokemon.image_path;
};

Pokemon.create = (newpokemon, result) => {
  sql.query("INSERT INTO pokemons SET ?", newpokemon, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pokemon: ", { id: res.insertId, ...newpokemon });
    result(null, { id: res.insertId, ...newpokemon });
  });
};

Pokemon.getAllPokemon = (title, result) => {
  let query = "SELECT * FROM pokemons";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Pokemons: ", res);
    result(null, res);
  });
};

Pokemon.getPokemonById = (id, result) => {
  sql.query(`SELECT * FROM pokemons WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pokemon: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found pokemon with the id
    result({ kind: "not_found" }, null);
  });
};
