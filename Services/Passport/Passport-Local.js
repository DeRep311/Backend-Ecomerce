const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('./../Databases/Mongo/Schemas/Users')
const { enviomail } = require('../Contact/nodmailer');
const log = require('winston');



passport.use('local-singup', new LocalStrategy({
    usernameField: 'username',
    passportField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const confirmacion = await user.findOne({ Username: username })
    const confirmacionEmail = await user.findOne({ Email: req.email })
    if (confirmacion || confirmacionEmail) {
        console.log('El username o email ya existe');
        done(null, false,req.flash('SignupMessage', 'el usuario o email ya existe'))
    } else {
        const datos = req.body;
        delete datos.password


        const newUser = new user();

        newUser.Username = username;
        newUser.Password = newUser.encryptPassword(password);
        newUser.Name = req.body.name,
            newUser.Adress = req.body.adress,
            newUser.Age = req.body.age,
            newUser.Tel = req.body.phone,
            newUser.prefij = req.body.pre,
            newUser.Email = req.body.email
            const info=await enviomail(datos)
            console.log(info);
             await newUser.save()

        done(null, newUser);
    }

}))


passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passportField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{

    try {
        
        const User = await user.findOne({ Username: username })
       
        if(!User){
            console.log('User no exist');
            return done(null, false, req.flash('SigninMessage', 'User not registered'))
    
        }
        if(!User.comparePassword(password)){
            
            console.log('Pass Incorrect');
            return done(null, false,req.flash('SigninMessage', 'password incorrect'))
        }
        done(null,User)
    } catch (error) {
     console.log(error);   
    }

}))
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    const newuser = await user.findById(id)
    done(null, newuser)
})