const fs=require('fs');
const Log=require('../models/logWorkout');
const ExerciseList = require('../models/excerciseSelector')


const updateExercise = async (req, res) => {
    try {
        const { date, weight, reps } = req.body;
        if (!date || !weight || !reps) {
            return res.status(400).json({
                message: 'All fields (date, weight, reps) are required.'
            });
        }
        const workoutLog = await Log.findOne({ date: new Date(date) });
        if (!workoutLog) {
            return res.status(404).json({ message: 'Workout log not found for the given date' });
        }
        workoutLog.weight = weight;
        workoutLog.reps = reps;
        await workoutLog.save();
        res.status(200).json({ message: 'Workout updated successfully', workoutLog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const logExercise = async (req, res) => {
    try {
        const { exercise, weight, reps, muscleGroup } = req.body;
        if (!exercise || !weight || !reps || !muscleGroup) {
            return res.status(400).json({
                message: 'All fields (exercise, weight, reps, muscleGroup) are required.'
            });
        }
        const workoutLog = new Log({
            exercise,
            weight,
            reps,
            muscleGroup
        });
        await workoutLog.save();
        res.status(201).json({ message: 'Workout logged successfully', workoutLog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getMuscleGroups = async (req, res) => {
    try {
        const exerciseList = await ExerciseList.findOne();
        if (!exerciseList) {
            return res.status(404).json({ message: 'No muscle groups found' });
        }
        const muscleGroupNames = Object.keys(exerciseList.muscleGroups);
        res.json(muscleGroupNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getExercises = async (req, res) => {
    try {
        const muscleGroup = req.params.muscleGroup.toLowerCase();
        const exerciseList = await ExerciseList.findOne();
        if (exerciseList && exerciseList.muscleGroups[muscleGroup]) {
            res.status(200).json(exerciseList.muscleGroups[muscleGroup]);
        } else {
            res.status(404).json({ message: 'No exercises found for this muscle group' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const viewAllWorkouts = async (req, res) => {
    try {
        // Fetch all workouts from the database
        const allWorkouts = await Log.find({});
        if (allWorkouts.length > 0) {
            res.status(200).json(allWorkouts);
        } else {
            res.status(404).json({ message: 'No workouts found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports={
    getExercises,
    logExercise,
    viewAllWorkouts,
    getMuscleGroups,
    updateExercise

}