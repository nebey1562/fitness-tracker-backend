const express=require('express');
const router=require('express').Router();
const trainController=require("../controllers/trainingController")
router.get("/GetExcercise/:muscleGroup",trainController.getExercises)
router.post("/LogExcercise",trainController.logExercise)

module.exports=router;