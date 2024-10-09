const { MongoClient } = require('mongodb');


const url = ''; 
const dbName = 'hospital_db'; 

async function main() {
    // Create a new MongoClient
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected successfully to MongoDB server');

       
        const db = client.db(dbName);

        const patientCollection = db.collection('Patient');

        // Example data to insert into the 'Patient' collection
        const newPatient = {
            pid: '',
            puuid: '',
            phone_number: 1234567890,
            p_name: 'John Doe',
            gender: 'Male',
            date_of_join: new Date('2023-10-05'),
            family_id: '',
            address: '123 Main St, Springfield, IL'
        };

        // Insert the example data into the collection
        const result = await patientCollection.insertOne(newPatient);
        console.log(`New patient inserted with ID: ${result.insertedId}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

main().catch(console.error);
