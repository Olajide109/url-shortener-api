# URL Shortener API

A lightweight URL Shortener REST API built with **Node.js** and **Express.js**. The application allows users to submit long URLs and generate shorter, unique identifiers that can be used to reference their original URLs.

URL records are currently stored in a local JSON file.

## Features

- Create shortened URL records from original URLs.
- Generate short codes for submitted URLs.
- Retrieve all stored URL records.
- Retrieve an individual URL record using its ID.
- Validate URL input using reusable validation utilities.
- Persist URL records using JSON file storage.
- Track creation and update timestamps.

## Tech Stack

- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Language:** JavaScript (ES Modules)
- **Storage:** JSON file
- **Package Manager:** npm

## Project Structure

```text
url-shortener-api/
│
├── data/
│   └── urls.json
│
├── routes/
│   └── urls.js
│
├── services/
│
├── utils/
│   ├── fileHelper.js
│   └── validation.js
│
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Olajide109/url-shortener-api.git
```

### 2. Navigate into the project directory

```bash
cd url-shortener-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

You should see a message indicating that the server is running.

## API Documentation

The API currently exposes the following endpoints.

### 1. Check API status

**GET /**

Checks whether the API is running.

Example:

```http
GET http://localhost:3000/
```

Expected response:

```text
URL Shortener is working
```

### 2. Create a shortened URL record

**POST /urls**

Creates a new URL record.

Request body:

```json
{
  "originalUrl": "https://www.example.com/some/very/long/url"
}
```

Example:

```http
POST http://localhost:3000/urls
Content-Type: application/json
```

A successful request returns HTTP `201` and a URL record containing fields such as:

```json
{
  "id": 1,
  "originalUrl": "https://www.example.com/some/very/long/url",
  "shortCode": "abc123",
  "createdAt": "2026-11-16T09:00:00.000Z",
  "updatedAt": "2026-11-16T09:00:00.000Z"
}
```

*The values above are illustrative.*

### 3. Retrieve all URL records

**GET /urls**

Returns all stored URL records.

```http
GET http://localhost:3000/urls
```

### 4. Retrieve a URL record by ID

**GET /urls/:id**

Retrieves a particular URL record using its ID.

Example:

```http
GET http://localhost:3000/urls/1
```

If the record does not exist, the API returns:

```json
{
  "error": "URL not found"
}
```

With HTTP status `404`.

## Data Storage

The application currently uses a JSON file located at:

```text
data/urls.json
```

URL records are read and written using Node.js filesystem operations.

This provides a simple persistence mechanism without requiring an external database.

## Team Members & Contributions

- Ibikunle Hafeez Olajide – Built the Express routing and CRUD endpoints (`routes/urls.js`).
- Ibrahim Olamide – Built the JSON file storage system (`utils/fileHelper.js` and `data/urls.json`).
- Kobby – Implemented request body and URL format validation helpers (`utils/validation.js`).
- Eric – Authored and structured the project documentation (`README.md`) and endpoint usage examples.
- Jane frances - Tested API endpoints using Postman and verified request/response functionality.

## Future Improvements

The following features could improve the project:

- Implement short URL redirection.
- Improve short-code generation and collision handling.
- Integrate URL validation into the creation endpoint.
- Add URL deletion functionality.
- Add automated tests.
- Implement centralized error handling.
- Introduce database integration.
- Add rate limiting for API protection.
- Add URL click analytics.

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test your implementation.
5. Commit and push your changes.
6. Open a Pull Request describing your contribution.

## License

This project currently specifies the ISC license in its package configuration.
