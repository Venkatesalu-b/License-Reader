const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());



app.post('/getsms/:number',async(req,res)=>{
    const {number} = req.params;

    const options = {
        method: 'POST',
        url: 'https://textflow-sms-api.p.rapidapi.com/send-sms',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '32f9bf6d08msh4af56bdedd348cbp1e14fbjsn9cfdbc12c69c',
          'X-RapidAPI-Host': 'textflow-sms-api.p.rapidapi.com'
        },
        data: {
          phone_number: number,
          text: 'Test message from TextFlow'
        }
      };
      
      try {
          const response =  axios.request(options);
          console.log(response.data,'otp');
      } catch (error) {
          console.error(error);
      }

  })

app.listen(3000,()=>{
    console.log(' 3000 port connected');
  })