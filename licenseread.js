const express = require('express');
const cors = require('cors');
const app = express();
const pool =require('./DBconnect');



app.use(cors());
app.use(express.json());


app.get('/gettext',async(req,res)=>{
    try{
      const text = await pool.query("select * from licenseinfo");
      res.json(text.rows)
      console.log(text);
    }
    catch(error){
      console.log(error,'message');
    }
  })


  app.post('/users/license',async(req,res)=>{
    try{
        const{licno,ridername,address,mobilenumber,email,vehicle}=req.body;
        const insert2 =await pool.query( "insert into licenseinfo (licno,ridername,address,mobilenumber,email,vehicle) VALUES($1,$2,$3,$4,$5,$6)",
        [licno,ridername,address,mobilenumber,email,vehicle])
        res.json(insert2.rows[0])
        // console.log(res.json(insert2.rows));
         
    }
    catch(err){
        console.log(err);

       
    }
 })


  app.listen(3000,()=>{
    console.log(' 3000 port connected');
  })