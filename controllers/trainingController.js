const fs=require('fs');
const Log=require('../models/logWorkout');
const ExerciseList = require('../models/excerciseSelector')

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

const viewRecentWorkouts = async (req, res) => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentWorkouts = await Log.find({
            date: { $gte: twentyFourHoursAgo }
        });
        if (recentWorkouts.length > 0) {
            res.status(200).json(recentWorkouts);
        } else {
            res.status(404).json({ message: 'No workouts logged in the last 24 hours' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const addExercise = async (req, res) => {
    try {
        const { muscleGroup, exercise } = req.body;

        if (!muscleGroup || !exercise) {
            return res.status(400).json({ message: 'Muscle group and exercise are required.' });
        }

        // 
        const lowerCaseMuscleGroup = muscleGroup.toLowerCase();
        let exerciseList = await ExerciseList.findOne();

        if (!exerciseList) {
            exerciseList = new ExerciseList({
                muscleGroups: {}
            });
        }
        if (!exerciseList.muscleGroups[lowerCaseMuscleGroup]) {
            exerciseList.muscleGroups[lowerCaseMuscleGroup] = [];
        }
        exerciseList.muscleGroups[lowerCaseMuscleGroup].push(exercise);
        await exerciseList.save();
        res.status(201).json({ message: 'Exercise added successfully', exerciseList });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports={
    getExercises,
    logExercise,
    addExercise,
    viewRecentWorkouts

}