# Ecommerce Customer Churn Dataset API

- Documentation: https://documenter.getpostman.com/view/50841270/2sBY4JwNPe
- Backend: https://ecommerce-customer-churn-dataset-1.onrender.com

A comprehensive backend API for managing customer data with advanced filtering, pagination, and bulk operations.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete customer records
- **Pagination**: Limit and offset-based pagination for large datasets
- **Filtering**: Filter customers by country, city, gender, and churn status
- **Bulk Operations**: Import, update, and delete multiple customers at once
- **Validation**: Comprehensive validation using Joi schemas
- **Error Handling**: Centralized error handling with custom ApiError class
- **Logging**: Request logging and timestamp middleware
- **Soft Delete**: Soft delete functionality to preserve data integrity

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **Joi**: Schema validation
- **dotenv**: Environment variable management

## Project Structure

```
ecommerce_customer_churn_dataset/
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── middlewares/   # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   ├── validations/   # Joi validation schemas
│   │   └── index.js       # Application entry point
│   ├── .env               # Environment variables
│   ├── package.json       # Project dependencies
│   └── server.js          # Server initialization
└── README.md
```

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce_customer_churn_dataset/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/customer_db
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

### Customers

#### Create Customer
```http
POST /api/v1/customers
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "[EMAIL_ADDRESS]",
  "gender": "Male",
  "age": 30,
  "city": "New York",
  "country": "USA",
  "income": 50000,
  "churned": false
}
```

#### Get All Customers
```http
GET /api/v1/customers?page=1&limit=10&country=USA&city=New%20York&gender=Male&churned=false
```

#### Get Customer by ID
```http
GET /api/v1/customers/:id
```

#### Update Customer
```http
PUT /api/v1/customers/:id
PATCH /api/v1/customers/:id
```
**Request Body:**
```json
{
  "age": 31,
  "income": 55000
}
```

#### Delete Customer (Soft Delete)
```http
DELETE /api/v1/customers/:id
```

#### Check Customer Exists
```http
GET /api/v1/customers/exists/:id
```

### Bulk Operations

#### Bulk Create Customers
```http
POST /api/v1/customers/bulk-create
```
**Request Body:**
```json
[
  {
    "name": "John Doe",
    "email": "[EMAIL_ADDRESS]",
    "gender": "Male",
    "age": 30,
    "city": "New York",
    "country": "USA",
    "income": 50000,
    "churned": false
  },
  {
    "name": "Jane Smith",
    "email": "[EMAIL_ADDRESS]",
    "gender": "Female",
    "age": 28,
    "city": "Los Angeles",
    "country": "USA",
    "income": 60000,
    "churned": true
  }
]
```

#### Bulk Update Customers
```http
PATCH /api/v1/customers/bulk-update
```
**Request Body:**
```json
{
  "ids": ["60d5ec49f1c2d3a4b5c6d7e8", "60d5ec49f1c2d3a4b5c6d7e9"],
  "updateData": {
    "churned": true,
    "updatedAt": "2023-10-27T10:00:00Z"
  }
}
```

#### Bulk Delete Customers
```http
DELETE /api/v1/customers/bulk-delete
```
**Request Body:**
```json
{
  "ids": ["60d5ec49f1c2d3a4b5c6d7e8", "60d5ec49f1c2d3a4b5c6d7e9"]
}
```

## Validation

All requests are validated using Joi schemas defined in `src/validations/customerValidation.js`.

### Validation Rules

- **Name**: Required, string, min 2 characters
- **Email**: Required, valid email format
- **Gender**: Required, must be 'Male', 'Female', or 'Other'
- **Age**: Optional, integer, 18-100
- **City**: Optional, string
- **Country**: Optional, string
- **Income**: Optional, number, >= 0
- **Churned**: Optional, boolean

## Error Handling

Errors are handled using the `ApiError` class and middleware.

**Common Error Responses:**

```json
// 400 Bad Request
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}

// 404 Not Found
{
  "success": false,
  "statusCode": 404,
  "message": "Customer not found",
  "errors": []
}

// 500 Internal Server Error
{
  "success": false,
  "statusCode": 500,
  "message": "Something went wrong",
  "errors": []
}
```

## Pagination

Use `page` and `limit` query parameters for pagination:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response Format:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Customers fetched successfully",
  "data": {
    "customers": [...],
    "pagination": {
      "totalItems": 100,
      "totalPages": 10,
      "currentPage": 1,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## Filtering

Filter customers using query parameters:

- `country`: Filter by country
- `city`: Filter by city
- `gender`: Filter by gender
- `churned`: Filter by churn status (true/false)

**Example:**
```http
GET /api/v1/customers?country=USA&churned=true
```

## Development

### Running in Watch
