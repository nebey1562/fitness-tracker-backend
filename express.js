const express=require('express');
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const conn = require('./services/db');
conn.dbConnection();


const traineeRoutes=require('./routes/Training');
app.use("/api/v1/fitness",traineeRoutes);

app.use("/*",(req,res)=>{
    res.send("Not Correct Route");
})
app.listen(4000,()=>{console.log("The server is running in port:4000")})