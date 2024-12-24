# Yetiştir Backend API Documentation

## Url: https://backend.ahmetcanisik5458675.workers.dev
## Base URL
The API is accessible at the root endpoint which returns a welcome message:
- `GET /` - Returns "Hello from Yetiştir Backend!"

## Authentication
Most endpoints require authentication via JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### User

#### Register
- **Endpoint:** `POST /user/register`
- **Authentication:** Not required
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string",
  }
  ```
- **Response:** (201 Created)
  ```json
  {
    "message": "User created successfully"
  }
  ```
- **Error Response:** (400 Bad Request)
  ```json
  "User already exists"
  ```

#### Login
- **Endpoint:** `POST /user/login`
- **Authentication:** Not required
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "string"
  }
  ```
- **Error Response:** (401 Unauthorized)
  ```json
  "Invalid email or password"
  ```

## Error Handling
- Authentication errors will return 401 status code
- Each error response includes an error message in the response body

## Notes
- All endpoints are CORS-enabled
- Token payload includes `userId`