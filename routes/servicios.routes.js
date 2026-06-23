const express = require('express');
const {
  getServicios,
  getServicioByNombre
} = require('../controllers/servicios.controller');

const router = express.Router();

router.get('/', getServicios);
router.get('/:nombre', getServicioByNombre);

module.exports = router;
