// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS package
import { User, Event, Community, UserCommunity } from './models.js';

const app = express();
const PORT = process.env.PORT || 3000;
const uri = 'mongodb+srv://elitehitman:elitehitman2910@plan-it.dhw8ggv.mongodb.net/';

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware to allow requests from frontend
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
    dbName: 'plan-it' // Specify your database name here
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Route to handle signup request
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ username, password });
        console.log('Document to be inserted:', newUser); // Debugging log
        await newUser.save();
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.errInfo?.details?.schemaRulesNotSatisfied) {
            error.errInfo.details.schemaRulesNotSatisfied.forEach(rule => {
                console.error('Missing properties:', rule.missingProperties);
            });
        }
        res.status(500).json({ message: 'Failed to create user' });
    }
});


// Example route to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).send('Internal Server Error');
    }
});

// Example route to get all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events', error);
        res.status(500).send('Internal Server Error');
    }
});

// Example route to get all communities
app.get('/communities', async (req, res) => {
    try {
        const communities = await Community.find();
        res.json(communities);
    } catch (error) {
        console.error('Error fetching communities', error);
        res.status(500).send('Internal Server Error');
    }
});

// Example route to get all user-community relationships
app.get('/usercommunities', async (req, res) => {
    try {
        const userCommunities = await UserCommunity.find();
        res.json(userCommunities);
    } catch (error) {
        console.error('Error fetching user-community relationships', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
