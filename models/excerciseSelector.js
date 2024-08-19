const mongoose = require('mongoose');
const Schema=require('mongoose').Schema;

const exerciseListSchema = new Schema({
    muscleGroups: {
        chest: [String],
        back: [String],
        triceps: [String],
        biceps: [String],
        quads: [String],
        calves: [String],
        abs: [String]
    }
});

const ExerciseList = mongoose.model('ExerciseList', exerciseListSchema);

module.exports = ExerciseList;