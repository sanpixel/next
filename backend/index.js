const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// API routes FIRST - before static files
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'next', port: PORT });
});

// Config endpoint for frontend to get Supabase settings at runtime
app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    siteUrl: process.env.SITE_URL || `http://localhost:${PORT}`,
    deployUrl: process.env.CLOUD_RUN_URL
  });
});

// Serve static files from Next.js build AFTER API routes
app.use(express.static(path.join(__dirname, '../frontend/out')));

// Catch-all handler: send back Next.js index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
