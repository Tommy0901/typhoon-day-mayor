module.exports = {
  errorMsg (res, status, message) {
    res.status(status).json({ status: 'error', message })
  }
}
