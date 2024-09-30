// rutas.js
const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 }, // Limitar tamaño a 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Solo se permiten imágenes");
  },
});

const {
  crearBeneficiario,
  obtenerBeneficiario,
} = require("./DataBeneficiario");
const { crearPublicacion } = require("./DataPublicacionDonacion");
const { agregarImagen } = require("./DataImagen");
const { agregarMateriales } = require("./DataMateriales");

const router = express.Router();

// Rutas
router.post("/ObBeneficiarios", obtenerBeneficiario);
router.post("/Beneficiarios", crearBeneficiario);
router.post("/crearpublicacion", crearPublicacion);
router.post("/crearimagen", upload.single("imagen"), agregarImagen);

module.exports = router;
