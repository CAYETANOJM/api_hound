function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      ok: false,
      message: 'Acceso no autorizado. Debes enviar Authorization: Bearer TOKEN.'
    });
  }

  const token = authHeader.split(' ')[1];

  if (!process.env.API_TOKEN) {
    return res.status(500).json({
      ok: false,
      message: 'La API no tiene configurado API_TOKEN en variables de entorno.'
    });
  }

  if (token !== process.env.API_TOKEN) {
    return res.status(401).json({
      ok: false,
      message: 'Token inválido.'
    });
  }

  return next();
}

module.exports = authMiddleware;
