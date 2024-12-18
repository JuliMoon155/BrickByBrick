// rutas.js
const express = require("express");
const { crearBeneficiario, obtenerBeneficiario, buscarBeneficiariosSinSolicitud } = require("./DataBeneficiario");
const { obtenerEmpresa, crearEmpresa } = require("./DataEmpresa");
const { crearPublicacion, buscarPublicacion, obtenerPublicacionesDeEmpresa, editarPublicacionDonacion} = require("./DataPublicacionDonacion");
const { agregarImagen } = require("./DataImagen");
const { agregarMateriales, editarMaterial} = require("./DataMateriales");
const { crearPublicacionBen, obtenerPublicacionesBen, deletePublicacionBen, ObPublicacionesBenPropias, editarPublicacionBen, obtenerLikesPublicacion, obtenerMisLikes, removeLikePublicacionBen, likePublicacionBen, obtenerComentarios, getComentariosPublicacionBen, comentarPublicacion} = require('./DataPublicacion');
const { crearInscripcion, eliminarInscripcion ,consultarInscripcion,obtenerInscripcionesXEmpresa} = require("./DataInscripcion");

const path = require("path");
const multer = require("multer");
const {crearSolicitudAmistad, obtenerMisSolicitudesAmistad, editarEstadoSolicitud} = require("./DataSolicitudAmistad");
const {crearAmistad, obtenerAmistades, editarEstadoAmistad, buscarAmistades} = require("./DataAmistad");
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
router.post("/BuscarBeneficiariosSinSolicitud", buscarBeneficiariosSinSolicitud);
router.post("/ObEmpresas", obtenerEmpresa);
router.post("/Empresas", crearEmpresa);
router.post("/crearMaterial", agregarMateriales);
router.post("/editarMaterial", editarMaterial);
router.post("/crearpublicacion", crearPublicacion);
router.put("/editarPublicacionBen", editarPublicacionBen);
router.post("/editarPublicacionDonacion", editarPublicacionDonacion);
router.post("/ObPublicacionesDeEmpresa", obtenerPublicacionesDeEmpresa);
router.post("/crearimagen", upload.single("imagen"), agregarImagen);
router.get("/ObPublicacionesBen", obtenerPublicacionesBen);
router.get("/ObPublicacionesBenPropias", ObPublicacionesBenPropias);
router.post("/PublicacionesBen", crearPublicacionBen);
router.post("/BuscarPublicacion", buscarPublicacion);
router.post("/CrearInscripcion", crearInscripcion);
router.get("/consultarInscripcion", consultarInscripcion);
router.delete("/EliminarInscripcion/:idInscripcion", eliminarInscripcion);
router.delete('/EliminarPublicacion/:id', deletePublicacionBen);
router.post("/like", likePublicacionBen);  // Para agregar un like
router.post("/Dislike", removeLikePublicacionBen);  // Para eliminar un like
router.get("/ObLikes", obtenerLikesPublicacion);
router.get("/ObMisLikes/:fk_idBeneficiario", obtenerMisLikes);
<<<<<<< HEAD
router.get("/ObComentarios/:fk_idPublicacionBen", obtenerComentarios);
router.post("/obtenerInscripcionesXEmpresa", obtenerInscripcionesXEmpresa);
=======
router.get("/ObComentarios/:fK_idPublicacionBen", obtenerComentarios);
router.get("/obtenerInscripcionesXEmpresa/:empresa", obtenerInscripcionesXEmpresa);
>>>>>>> 0ecb3be493309bd0004b4c1a0c902c4a845bf457
router.post("/CrearSolicitudAmistad", crearSolicitudAmistad);
router.post("/ObMisSolicitudesAmistad", obtenerMisSolicitudesAmistad);
router.post("/EditarEstadoSolicitud", editarEstadoSolicitud);
router.post("/CrearAmistad", crearAmistad);
router.post("/BuscarAmistades", buscarAmistades);
router.post("/ObAmistades", obtenerAmistades);
router.post("/EditarEstadoAmistad", editarEstadoAmistad)

module.exports = router;
