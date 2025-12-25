const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./presentation/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..')));

app.use('/api', routes);

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║     Admin CMS Server - Clean Architecture                   ║
╠════════════════════════════════════════════════════════════╣
║  🚀 Server running at: http://localhost:${PORT}              ║
║  📊 Admin Dashboard:   http://localhost:${PORT}/admin        ║
║  🌐 Portfolio:         http://localhost:${PORT}/             ║
║  📡 API:               http://localhost:${PORT}/api/all      ║
╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
