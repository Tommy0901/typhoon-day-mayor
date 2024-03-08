module.exports = {
  apiErrorHandler (err, req, res, next) {
    err instanceof Error
      ? res.status(err.status || 500).json({
        status: 'error',
        message: err.message
      })
      : res.status(500).json({
        status: 'error',
        message: `${err}`
      })
    next(err)
  }
}
