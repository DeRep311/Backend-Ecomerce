const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt')


const Auth = new Schema({
   Username: String
   ,
   Email: String,
   Password: String,
   Name: String,
   Tel: Number,
   prefij: String,
   type: {
      Boolean,
      defaultValue: false
   }




})
Auth.methods.encryptPassword = function (Password) {
   return bcrypt.hashSync(Password, bcrypt.genSaltSync(10))
};

Auth.methods.comparePassword = function (password) {

   return bcrypt.compareSync(password, this.Password)
};

module.exports = mongoose.model('users', Auth);