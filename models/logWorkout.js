// models/WorkoutLog.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutLogSchema = new Schema({
    exercise: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    muscleGroup: {
        type: String,
        required: true,
    }
});



const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema);

module.exports = WorkoutLog;
