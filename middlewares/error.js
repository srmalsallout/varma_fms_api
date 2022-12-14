exports.errorHandler = async (err, req, res, next) => {
    if (err) return res.status(err.status || 500).json({ error: err.message });
}
