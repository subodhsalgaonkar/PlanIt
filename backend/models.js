// models.js
import { Schema, model } from 'mongoose';

// Define schemas
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: '' } // Add a default value for optional fields
});

const EventSchema = new Schema({
    date: { type: Date, default: Date.now },
    time: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


const CommunitySchema = new Schema({
    community_title: { type: String, default: '' },
    type: {
        type: String,
        enum: ['Sports', 'Education', 'Entertainment', 'Health', 'Technology', 'Gaming', 'Music', 'Art', 'Science', 'Other'],
        default: 'Other'
    },
    security: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    code: {
        type: String,
        required: function () { return this.security === 'private'; }
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const UserCommunitySchema = new Schema({
});

// Create models based on schemas
export const User = model('User', UserSchema);
export const Event = model('Event', EventSchema);
export const Community = model('Community', CommunitySchema);
export const UserCommunity = model('UserCommunity', UserCommunitySchema);