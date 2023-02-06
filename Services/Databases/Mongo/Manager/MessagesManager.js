const mensajes = require('./../Schemas/Messages')
class Menssages {
    constructor() {
    
        this.bd = mensajes;
    }

    async Create(param) {

        const data = new this.bd(param)
        data.save().then(data => console.log('Mensaje recibido')).catch(err => console.log(err))

        return param
    }

    async Read() {
        let data = await this.bd.find({}).lean()
            data.forEach(obj => {
                obj.id = obj['_id'].toString()
                delete(obj['_id'])
            })
            return data
    }
   

    
}





module.exports = Menssages