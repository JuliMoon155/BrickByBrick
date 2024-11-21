// rutas.js
const express = require("express");
const { crearBeneficiario, obtenerBeneficiario } = require("./DataBeneficiario");
const { obtenerEmpresa, crearEmpresa } = require("./DataEmpresa");
const { crearPublicacion, buscarPublicacion, obtenerPublicacionesDeEmpresa, editarPublicacionDonacion} = require("./DataPublicacionDonacion");
const { agregarImagen } = require("./DataImagen");
const { agregarMateriales, editarMaterial} = require("./DataMateriales");
const { crearInscripcion } = require("./DataInscripcion");
const { crearPublicacionBen,obtenerPublicacionesBen, likePublicacionBen, removeLikePublicacionBen, deletePublicacionBen } = require('./DataPublicacion');

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


const router = express.Router();

// Rutas
router.post("/ObBeneficiarios", obtenerBeneficiario);
router.post("/Beneficiarios", crearBeneficiario);
router.post("/ObEmpresas", obtenerEmpresa);
router.post("/Empresas", crearEmpresa);
router.post("/crearMaterial", agregarMateriales);
router.post("/editarMaterial", editarMaterial);
router.post("/crearpublicacion", crearPublicacion);
router.post("/editarPublicacionDonacion", editarPublicacionDonacion);
router.post("/ObPublicacionesDeEmpresa", obtenerPublicacionesDeEmpresa);
router.post("/crearimagen", upload.single("imagen"), agregarImagen);
router.get("/ObPublicacionesBen", obtenerPublicacionesBen);
router.post("/PublicacionesBen", crearPublicacionBen);
router.post("/BuscarPublicacion", buscarPublicacion);
router.post("/CrearInscripcion", crearInscripcion);
router.delete('/EliminarPublicacion/:id', deletePublicacionBen);
router.post("/like", likePublicacionBen);  // Para agregar un like
router.delete("/like", removeLikePublicacionBen);  // Para eliminar un like

module.exports = router;
