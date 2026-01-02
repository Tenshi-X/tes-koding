const Pokemon = require("../models/pokemon_model.js");

exports.findAll = (req, res) => {

 Pokemon.getAll(title, (err, data) => {
   if (err)
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving Pokemons.",
     });
   else res.send(data);
 });

};

exports.findById = (req, res) => {
     Pokemon.GetPokemonById(req.params.id, (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found Pokemon with id ${req.params.id}.`,
           });
         } else {
           res.status(500).send({
             message: "Error retrieving Pokemon with id " + req.params.id,
           });
         }
       } else res.send(data);
     });
};
