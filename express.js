const express=require('express');
const app=express();
const cors = require('cors');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const conn = require('./services/db');
conn.dbConnection();


const traineeRoutes=require('./routes/Training');
app.use(cors());
app.use("/api/v1/fitness",traineeRoutes);

app.use("/*",(req,res)=>{
    res.send("Not Correct Route");
})
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{console.log("The server is running in port:4000")})