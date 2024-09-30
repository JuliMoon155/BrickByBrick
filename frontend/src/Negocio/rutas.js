// rutas.js
const express = require("express");
const { crearBeneficiario, obtenerBeneficiario } = require("./DataBeneficiario");

const router = express.Router();

// Rutas
router.post("/ObBeneficiarios", obtenerBeneficiario);
router.post("/Beneficiarios", crearBeneficiario);

module.exports = router;
