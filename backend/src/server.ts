import express, { Request, Response,  } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || 'https://memorify-9iah.onrender.com';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Setup multer for file uploads
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../../frontend/dist'))); // assuming Vite instead of CRA

// Ping route
app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

// File upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  res.json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

// Parameter route
app.get('/api/:id', (req: Request<{ id: string }>, res: Response) => {
  res.send(`ID: ${req.params.id}`);
});

// Test route with hardcoded param
app.use('/test/:id', (req: Request<{ id: string }>, res: Response) => {
  res.send(`Test route ID: ${req.params.id}`);
});

// Example API call to external (your own) endpoint
app.get('/api/internal-call', async (_req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/api/ping`);
    res.json(response.data);
  } catch (error) {
    console.error('Internal API call error:', error);
    res.status(500).send('Internal server error');
  }
});

// Fallback route for client-side routing
app.get('*', (_req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  } catch (error) {
    console.error('Error serving frontend:', error);
    res.status(500).send('Internal server error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});