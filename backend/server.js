const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tasksRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});