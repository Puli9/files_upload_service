# File Upload Service API

## Overview
This project provides a backend API for managing file uploads, downloads, and deletions. Built using Node.js, Express, Multer, and MongoDB, it stores uploaded files on the server and metadata in MongoDB. Users can upload JPEG, PNG, or PDF files with size limit(5MB) and retrieve or delete them by their IDs.

## Features
- **Upload Files**: Supports JPEG, PNG, and PDF formats with a size limit of 5MB
- **Download Files**: Download files by their ID
- **Delete Files**: Delete both the file and its metadata
- **Error Handling**: Ensures proper feedback for invalid requests and errors

## Technologies Used
- **Node.js**: JavaScript runtime environment for building backend services
- **Express.js**: Web framework for building APIs
- **Multer**: Middleware for handling file uploads
- **MongoDB**: NoSQL database for storing file metadata
- **Mongoose**: ODM library to connect Node.js with MongoDB
- **dotenv**: Manages environment variables securely

## Project Structure
```
file-upload-service/
│
├── .env                  // Environment variables configuration
├── package.json          // Project dependencies and scripts
├── src/
│   ├── app.js           // Entry point of the application
│   ├── config/
│   │   └── database.js  // MongoDB connection logic
│   ├── middleware/
│   │   └── upload.js    // Multer configuration for file uploads
│   ├── models/
│   │   └── File.js      // Mongoose schema for file metadata
│   └── routes/
│       └── fileRoutes.js // API endpoints for upload, download, delete
└── uploads/             // Directory to store uploaded files
```

## Installation

### Prerequisites
- Node.js installed on your machine
- MongoDB running locally or use MongoDB Atlas

### Steps to Set Up the Project

1. Clone the repository:
```bash
git clone https://github.com/your-username/file-upload-service.git
cd file-upload-service
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```bash
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Create the uploads directory:
```bash
mkdir uploads
```

5. Start the MongoDB server:
```bash
mongod
```

6. Run the application:
```bash
npm start
```

You should see:
```
Server is running on port 3000
MongoDB connected successfully
```

## Usage and Testing with Postman

### API Endpoints

#### 1. Upload a File
- **Method**: POST
- **URL**: `http://localhost:3000/api/upload`
- In Postman:
   - Go to the Body tab, select form-data
   - Add a key `file` of type File and select a file from your system
   - Click Send
- **Response**(Example):
```json
{
  "message": "File uploaded successfully",
  "file": {
    "id": "6520ad2fe927f908b23f",
    "filename": "1698220655000-123456789.png",
    "originalName": "profile-picture.png",
    "size": 204800,
    "uploadedAt": "2024-10-25T07:17:36.795Z"
  }
}
```

#### 2. Download a File
- **Method**: GET
- **URL**: `http://localhost:3000/api/download/<file_id>`
- Click Send to download the file
- **Response**: File will download with the original filename

#### 3. Delete a File
- **Method**: DELETE
- **URL**: `http://localhost:3000/api/delete/<file_id>`
- Click Send to delete the file
- **Response**:
```json
{
  "message": "File deleted successfully"
}
```

### Error Handling
- **400 Bad Request**: Returned when no file is uploaded or the file exceeds the size limit
- **404 Not Found**: Returned when a file or metadata is not found
- **500 Internal Server Error**: Returned for unexpected server issues
