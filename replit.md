# Project

Node.js Express backend that integrates with Google Drive API to list and download JPEG images from a designated folder. Uses `googlekey.json` service account credentials.

## Stack
- Node.js 20, Express
- googleapis, mongoose (MongoDB connection currently commented out), dotenv, cors

## Run
- Workflow `Start application` runs `node server.js` on port 5000 (host `0.0.0.0`).
- Deployment: VM target, run `node server.js`.

## Notes
- Server originally on port 3000; switched to `process.env.PORT || 5000` for Replit preview.
- Files are downloaded into `./imageStation/`.
