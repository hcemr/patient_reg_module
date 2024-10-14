const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid'); // For generating unique UUIDs

const app = express();
const PORT = 3000;

// MongoDB connection details
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const dbName = 'hospital_db';

app.use(bodyParser.json());

let db;

// Connect to MongoDB and store the connection in the `db` variable
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Get all practitioners
app.get('/practitioners', (req, res) => {
    db.collection('Practitioner')
        .find({})
        .toArray()
        .then(practitioners => res.json(practitioners))
        .catch(error => res.status(500).json({ error: 'Could not fetch practitioners' }));
});

// Get a practitioner by ID
app.get('/practitioners/:pract_id', (req, res) => {
    const { pract_id } = req.params;
    db.collection('Practitioner')
        .findOne({ pract_id })
        .then(practitioner => {
            if (practitioner) {
                res.json(practitioner);
            } else {
                res.status(404).json({ message: 'Practitioner not found' });
            }
        })
        .catch(error => res.status(500).json({ error: 'Error fetching practitioner' }));
});

// Add a new practitioner
app.post('/practitioners', (req, res) => {
    const { name, role, date_of_joining, date_of_resignation } = req.body;
    const newPractitioner = {
        pract_id: uuidv4(), // Unique ID for the practitioner
        pract_uuid: uuidv4(),
        name,
        role,
        date_of_joining: new Date(date_of_joining),
        date_of_resignation: date_of_resignation ? new Date(date_of_resignation) : null
    };

    db.collection('Practitioner')
        .insertOne(newPractitioner)
        .then(result => res.status(201).json(result.ops[0]))
        .catch(error => res.status(500).json({ error: 'Could not create practitioner' }));
});

// Update a practitioner's details by ID
app.put('/practitioners/:pract_id', (req, res) => {
    const { pract_id } = req.params;
    const updatedData = req.body;

    if (updatedData.date_of_joining) {
        updatedData.date_of_joining = new Date(updatedData.date_of_joining);
    }
    if (updatedData.date_of_resignation) {
        updatedData.date_of_resignation = new Date(updatedData.date_of_resignation);
    }

    db.collection('Practitioner')
        .updateOne({ pract_id }, { $set: updatedData })
        .then(result => {
            if (result.matchedCount > 0) {
                res.json({ message: 'Practitioner updated successfully' });
            } else {
                res.status(404).json({ message: 'Practitioner not found' });
            }
        })
        .catch(error => res.status(500).json({ error: 'Could not update practitioner' }));
});

// Delete a practitioner by ID
app.delete('/practitioners/:pract_id', (req, res) => {
    const { pract_id } = req.params;

    db.collection('Practitioner')
        .deleteOne({ pract_id })
        .then(result => {
            if (result.deletedCount > 0) {
                res.json({ message: 'Practitioner deleted successfully' });
            } else {
                res.status(404).json({ message: 'Practitioner not found' });
            }
        })
        .catch(error => res.status(500).json({ error: 'Could not delete practitioner' }));
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
