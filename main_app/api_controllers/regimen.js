const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory data store (simulating a database for simplicity)
let regimens = [];

// GET all regimens
app.get('/regimens', (req, res) => {
    res.json(regimens);
});

// GET a single regimen by ID
app.get('/regimens/:reg_id', (req, res) => {
    const { reg_id } = req.params;
    const regimen = regimens.find(r => r.reg_id === reg_id);
    if (regimen) {
        res.json(regimen);
    } else {
        res.status(404).json({ message: 'Regimen not found' });
    }
});

// POST a new regimen
app.post('/regimens', (req, res) => {
    const { practitioner_id, pid, p_name, date
