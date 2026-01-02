// app.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const pokemonRoutes = require("./route/pokemon_route");
app.use(bodyParser.json());
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pokemon_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/fetch-and-save", async (req, res) => {
  for (let i = 1; i < 400, i++; ) {
    try {
      const data = await axios
        .get("https://pokeapi.co/api/v2/pokemon/2/")
        .then((response) => response.data);

      const insertQuery =
        "INSERT INTO pokemons (name, base_experience, weight, image_path) VALUES (?, ?, ?, ?)";

      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        await connection.query(insertQuery, [
          data.name,
          data.base_experience,
          data.weight,
          data.image_path,
        ]);

        await connection.commit();
        res.json({ message: "Data fetched and saved successfully" });
      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Failed to fetch or save data" });
    }
  }
});

app.use("/api", pokemonRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
