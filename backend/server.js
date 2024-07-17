import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
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
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user
        const newUser = new User({ username, password });
        console.log('Document to be inserted:', newUser); // Debugging log
        await newUser.save();
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate username error
            console.error('Error: Duplicate username');
            res.status(400).json({ message: 'Username already exists' });
        } else {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user' });
        }
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare plain text passwords
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Login successful, return user data
        res.json({ message: 'Login successful', user: { _id: user._id, username: user.username } });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to handle adding new events
app.post('/events', async (req, res) => {
    const { date, time, title, description, userId } = req.body;

    try {
        const newEvent = new Event({
            date,
            time,
            title,
            description,
            userId
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Failed to create event' });
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

// Route to handle updating user name
app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        await user.save();

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});

// Route to handle fetching events for a specific user
app.get('/events', async (req, res) => {
    const userId = req.query.userId;

    try {
        const events = await Event.find({ userId });
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
