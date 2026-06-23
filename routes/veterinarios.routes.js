const express = require('express');
const { getVeterinarios } = require('../controllers/veterinarios.controller');

const router = express.Router();

router.get('/', getVeterinarios);

module.exports = router;
