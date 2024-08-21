const express=require('express');
const router=require('express').Router();
const trainController=require("../controllers/trainingController")
router.get("/GetExcercise/:muscleGroup",trainController.getExercises)
router.get('/muscleGroups', trainController.getMuscleGroups);
router.post("/LogExcercise",trainController.logExercise)
router.get("/viewWorkouts",trainController.viewAllWorkouts)
router.put("/updateLog",trainController.updateExercise)
module.exports=router;