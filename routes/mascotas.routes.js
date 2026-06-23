const express = require('express');
const { getMascotas } = require('../controllers/mascotas.controller');

const router = express.Router();

router.get('/', getMascotas);

module.exports = router;
