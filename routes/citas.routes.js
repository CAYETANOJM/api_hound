const express = require('express');
const { createCita, getCitas } = require('../controllers/citas.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', createCita);
router.get('/', authMiddleware, getCitas);

module.exports = router;
