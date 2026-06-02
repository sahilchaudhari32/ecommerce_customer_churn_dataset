const ApiError = require("../utils/ApiError");

const validate = (schema, source = "body") => (req, res, next) => {
  const { value, error } = schema.validate(req[source], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(new ApiError(400, "Validation Failed", errorMessages));
  }

  // Replace original data with validated/sanitized data
  req[source] = value;
  next();
};

module.exports = validate;
