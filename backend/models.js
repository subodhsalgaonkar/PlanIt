// models.js
import { Schema, model } from 'mongoose';

// Define schemas
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: '' } // Add a default value for optional fields
});

const EventSchema = new Schema({
    event_id: { type: String, unique: true },
    date: { type: Date, default: Date.now }, // Add a default date
    time: { type: String, default: '' }, // Add a default value for optional fields
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    photo: { type: String, default: '' },
    community_id: { type: String, default: '' },
    user_id: { type: String, default: '' }
});

const CommunitySchema = new Schema({
    community_id: { type: String, unique: true },
    community_title: { type: String, default: '' } // Add a default value for optional fields
});

const UserCommunitySchema = new Schema({
    user_id: { type: String, default: '' }, // Add a default value for optional fields
    community_id: { type: String, default: '' } // Add a default value for optional fields
});

// Create models based on schemas
export const User = model('User', UserSchema);
export const Event = model('Event', EventSchema);
export const Community = model('Community', CommunitySchema);
export const UserCommunity = model('UserCommunity', UserCommunitySchema);