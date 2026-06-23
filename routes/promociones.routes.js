const express = require('express');
const { getPromocionesActivas } = require('../controllers/promociones.controller');

const router = express.Router();

router.get('/', getPromocionesActivas);

module.exports = router;
