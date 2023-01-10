const dotenv= require('dotenv')
dotenv.config({path:"./.env"})
const services = require('./routes/service.js')
const users = require('./routes/user.js')
const express = require('express');
const path = require('path');
const flash= require('connect-flash')
const morgan = require('morgan');

const session = require('express-session')
const passport = require('passport')


const port = process.env.PORT;
const app = express();
require('./Services/Passport/Passport-Local')
require('./Services/Databases/Mongo/mongoose')
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'mongoSecret',
    resave: false ,
    saveUninitialized: false,
}))
const logger=require('./utils/logger')
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()) 
app.use((req, res, next)=>{
    app.locals.signup= req.flash('SignupMessage')
    app.locals.signin= req.flash('SigninMessage')
    app.locals.user= req.user
    next();
 })
app.use('/api', services);
app.use('/', users)
require('./Services/Passport/Passport-Local')


 
app.listen(port, (err)=>{
    if (err) console.log("Error in server setup")
    logger.info(`Su servidor escucha en el puerto ${port}`);
   
})
module.exports=app;