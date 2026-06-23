function getHealth(req, res) {
  return res.json({
    ok: true,
    service: 'Veterinaria Hound Hub API',
    status: 'active',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  getHealth
};
