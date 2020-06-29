import * as mongoose from 'mongoose';

export const LearningSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export interface Learning {
    imageUrl: string;
    courseName: string;
    description: string;
    url: string;
}
