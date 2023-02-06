const user = require('./../Schemas/Users')
const log= require('winston')
class User {
    constructor() {
        this.newUser = new user();
        this.db = user
    }
    async Create(info) {
        try {
            console.log(info);
            this.newUser.Username = info.username;
            this.newUser.Password = this.newUser.encryptPassword(info.password);
            this.newUser.Name = info.name,
            this.newUser.Tel = info.phone,
            this.newUser.prefij = info.pre,
            this.newUser.Email = info.email
            await this.newUser.save()
            return this.newUser
        } catch (error) {
           console.log(error);
        }
 
    }
    async Verify(data) {
        const Info = await this.db.findOne(data)
        return Info
    }
    async id(data){
        const Info = await this.db.findById(data)
        return Info
    }
    
    async VerifyAndPass(user, password){
        const Info = await this.db.findOne({ Username: user })
        if (!Info) {
            log.warn('User Incorrect');
            return {Validate: false, message:'User not registered'}
        }
        if (!Info.comparePassword(password)) {

            log.warn('Pass Incorrect');
            return {Validate: false, message:'Password incorrect'}
        } 
        const id= Info._id.toString()
        console.log(Info);
        return  {Validate: true, message:'User registred',ID: id}
    }

}
module.exports= User