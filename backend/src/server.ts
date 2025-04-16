import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup multer for file uploads
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// Test route
app.get('/api/ping', (req, res) => {
  res.send('pong');
});

// File upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log('Received file:', req.file);
  res.json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
