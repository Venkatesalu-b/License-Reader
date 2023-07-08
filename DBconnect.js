const {Client} = require('pg');


const client = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"12345678",
    database:"postgres"
})

client.connect((err)=>{
if(err){

return console.log('Not connected');

}
else{
    return console.log('Connected');
}
}
);



module.exports = client