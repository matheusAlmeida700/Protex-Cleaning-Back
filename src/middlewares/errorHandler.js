// Catches errors and returns a 500 Internal Server Error response
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error." });
};

export default errorHandler;
