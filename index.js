const express = require("express");
const dbConnection = require("./database/config");
const cors = require('cors');

require("dotenv").config();

// Crear servidor de express
const app = express();

dbConnection();

// CORS
app.use(cors());

// Para leer body del post request
app.use(express.json());

// Directorio publico
app.use(express.static('public'));

// Rutas
app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));

// Auth // crear, login, renew

// CRUD: Eventos

// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log("Servidor corriendo puerto " + process.env.PORT);
});
