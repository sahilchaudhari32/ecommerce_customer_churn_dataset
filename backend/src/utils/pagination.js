
const getPaginationMetadata = (page, limit, totalItems) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    totalPages,
    currentPage: page,
    limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

const getPaginationOptions = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;

  // Sorting logic
  let sortBy = query.sortBy || query.sort || "createdAt";
  if (sortBy === "date") sortBy = "createdAt"; // Alias date to createdAt
  
  const sortOrder = (query.sortOrder || query.order) === "asc" ? 1 : -1;
  const sort = { [sortBy]: sortOrder };

  return { page, limit, skip, sort };
};

module.exports = {
  getPaginationMetadata,
  getPaginationOptions,
};
