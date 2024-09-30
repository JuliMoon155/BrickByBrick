// rutas.js
const express = require("express");
const { crearBeneficiario, obtenerBeneficiario } = require("./DataBeneficiario");
const { obtenerEmpresa, crearEmpresa } = require("./DataEmpresa");

const router = express.Router();

// Rutas
router.post("/ObBeneficiarios", obtenerBeneficiario);
router.post("/Beneficiarios", crearBeneficiario);
router.post("/ObEmpresas", obtenerEmpresa);
router.post("/Empresas", crearEmpresa);


module.exports = router;
