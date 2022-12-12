exports.errorHandler = async (err, req, res, next) => {
    console.log('caught by error middleware', '\n', { error: err })
    if (err) return res.status(500).json({ error: err.message });
}
