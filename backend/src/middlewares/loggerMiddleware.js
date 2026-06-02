const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${
        res.statusCode
      } - ${duration}ms`
    );
  });
  next();
};

const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

module.exports = {
  loggerMiddleware,
  requestTimeMiddleware,
};
