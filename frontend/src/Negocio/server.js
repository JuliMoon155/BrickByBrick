// server.js
const express = require("express");
const cors = require("cors");
const rutas = require("./rutas");
const app = express();
const port = 5000;

app.use(cors())
;
app.use(express.json());

app.use("/api", rutas);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
