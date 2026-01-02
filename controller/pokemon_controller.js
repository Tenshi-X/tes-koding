const Pokemon = require("../models/pokemon_model.js");

// Create and Save a new Pokemon
exports.create = (req, res) => {
     if (!req.body) {
       res.status(400).send({
         message: "Content can not be empty!",
       });
     }
     
     const pokemon = new Pokemon({
       name : req.body.name,
       base_experience : req.body.base_experience,
       weight : req.body.weight,
       image_path : req.body.image_path
     });

     // Save Pokemon in the database
     Pokemon.insert(pokemon, (err, data) => {
       if (err)
         res.status(500).send({
           message:
             err.message || "Some error occurred while creating the Pokemon.",
         });
       else res.send(data);
     });
};

// Retrieve all Pokemons from the database (with condition).
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

// Find a single Pokemon with a id
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
