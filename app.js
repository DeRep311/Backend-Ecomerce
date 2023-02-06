
//dependences & config 
const express = require('express');
const app = express();
const { Server : websocketServer }=require ("socket.io");
const { Server : HTTPServer}= require ('http');
const http = new HTTPServer(app);
const io = new websocketServer(http);
const sockets= require('./Services/WebSockets/sockets')

const dotenv = require('dotenv')
dotenv.config({ path: "./.env" })

const services = require('./routes/service.js')
const users = require('./routes/user.js')

const {engine}=require('express-handlebars')
const morgan = require('morgan');
const compression = require('compression')

const session = require('express-session')
const minimist = require('minimist')
const logger = require('./utils/logger')
const mongoStore = require('connect-mongo');
const path = require('path');



const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT":8080
    }
};
const { PORT } = minimist(process.argv.slice(2), options);

//Inicio de DB
require('./Services/Databases/Mongo/mongoose')


//Middlewares & views

//utilizo este middleware para comprimir las peticiones y sean un poco mas eficientes
app.use(compression())

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
        store: mongoStore.create({
        mongoUrl: process.env.MongoConfig,
        options: {
            userNewParser: true,
            useUnifiedTopology: true,
        }
    }),
    secret: 'mongoSecret',
    resave: false,
    saveUninitialized: false,
}))
app.set('views', './Public/Views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.join(__dirname + '/Public/Views/Layout'),
    partialsDir: path.join(__dirname + '/Public/Views/partials')
}))

//Routes
app.use(express.static('public'))
app.use('/api', services);
app.use('/', users)

//le doy los archivos necesarios para que se ejecute correctamente el chat global
app.use('/ChatGlobal',express.static(__dirname + '/public/Chat'))
sockets(io);


//Start
http.listen(PORT, (err) => {
    err
        ? console.log("Error in server setup")
        : logger.info(`Su servidor escucha en el puerto ${PORT}`);

})
module.exports = app;