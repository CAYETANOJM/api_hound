const express = require('express');
const {
  getConsejos,
  getConsejosByMascota
} = require('../controllers/consejos.controller');

const router = express.Router();

router.get('/', getConsejos);
router.get('/:mascota', getConsejosByMascota);

module.exports = router;
