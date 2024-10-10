try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB server');

    // Select the database
    const db = client.db(dbName);

    // Define the 'Regimen' collection
    const regimenCollection = db.collection('Regimen');

    // Example data to insert into the 'Regimen' collection
    const newRegimen = {
        reg_id: 'R001',
        reg_uuid: '550e8400-e29b-41d4-a716-446655440000', // Example UUID
        practitioner_id: 'PRAC001',
        pid: 1001,
        p_name: 'Jane Doe',
        date_of_appointment: new Date('2023-10-01'),
        regimen: 'Take 1 tablet of medicine A every morning for 10 days.',
        RX: 'RX001',
        date_of_mod: 1696203600, // Unix timestamp representing date_of_mod (for example)
        date_of_delete: 0, // Assuming 0 means not deleted
        updated_regimen: 'Changed to 1 tablet of medicine A every evening for 10 days.',
        fam_link_uuid: '123e4567-e89b-12d3-a456-426614174000', // Example UUID, can be null
        medicine_dispatcher: 'DISP001'
    };

    // Insert the example data into the collection
    const result = await regimenCollection.insertOne(newRegimen);
    console.log(`New regimen inserted with ID: ${result.insertedId}`);
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
} finally {
    // Close the connection
    await client.close();
}


main().catch(console.error);
