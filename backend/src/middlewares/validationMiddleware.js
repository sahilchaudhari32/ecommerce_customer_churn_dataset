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

  // Replace/Merge validated data
  try {
    if (source === "body") {
      req.body = value;
    } else {
      // For query/params in Express 5, we can't always reassign. 
      // We'll attach it to req.validated to be safe, but also try merging.
      Object.keys(value).forEach(key => {
        try { req[source][key] = value[key]; } catch (e) {}
      });
    }
  } catch (e) {
    console.warn(`Could not fully sync validated ${source}`);
  }
  
  req.validated = value;
  next();
};

module.exports = validate;
