# Project One - Express Server

A basic Node.js Express server setup with a test route.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Project-one-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

Start the server using Node.js:

```bash
npm start
```

By default, the server runs on port 3000 (`http://localhost:3000`). You can customize the port by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## API Endpoints

- `GET /` - Root health check endpoint.
  - **Response (200 OK):**
    ```json
    {
      "status": "success",
      "message": "Express server is running",
      "timestamp": "2025-01-01T00:00:00.000Z"
    }
    ```

- `GET /api/test` - Test route.
  - **Response (200 OK):**
    ```json
    {
      "status": "success",
      "message": "Test route is working properly"
    }
    ```

## Running Tests

To run the automated test suite:

```bash
npm test
```
