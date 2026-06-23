function notFound(req, res) {
  return res.status(404).json({
    ok: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.statusCode || 500).json({
    ok: false,
    message: error.message || 'Ocurrió un error interno en el servidor.'
  });
}

module.exports = {
  notFound,
  errorHandler
};
