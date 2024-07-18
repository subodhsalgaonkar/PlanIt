import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://kungfubodh:subodhsalgaonkar@plan-it.dhw8ggv.mongodb.net/';
// const uri = 'mongodb+srv://elitehitman:elitehitman2910@plan-it.dhw8ggv.mongodb.net/';

let db;

export async function connectToDatabase() {
    if (db) return db; // Return the db instance if already connected

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db('your-database-name'); // Replace with your database name
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}
