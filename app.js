
const routes = require('./routes/routes.js')
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', routes);



 
app.listen(port, (err)=>{
    if (err) console.log("Error in server setup")
    console.log(`Su servidor escucha en el puerto ${port}`);
})
module.exports=app;