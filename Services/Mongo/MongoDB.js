const Base = require("./mongoose");

const ObjectId = require('mongoose').Types.ObjectId



class CRUD {
    constructor(Select) {

        if (Select == 1) {
            this.bd = Base.Produ;
        } else {
            this.bd = Base.Cart;
        }
    }

    async Create(param) {
        console.log(param);
        const data = await new this.bd(param)
        return data.save().then(data => data._id).catch(err => console.log(err))
    }
    isValidObjectId(id) {

        if (ObjectId.isValid(id)) {
            if ((String)(new ObjectId(id)) === id)
                return true;
            return false;
        }
        return false;
    }

    async Read(id_nom) {
        const param = this.isValidObjectId(id_nom)

        if (param) {
            const data = await this.bd.findById(id_nom)
            return data
        } else {
            console.log(typeof (id_nomb));
            if (typeof (id_nom) === "string") {
                const data = await this.bd.findOne({ Nombre: id_nom })
                return data
            } else {
                const data = await this.bd.find()
                return data
            }
        }

    }
    async Update(id_nomb, params) {

        const option = { new: true }
        const dat = { $set: params }
        let data;



        const param = this.isValidObjectId(id_nomb)

        if (param) {
            data = await this.bd.findOneAndUpdate({_id: id_nomb},dat)
            return data
         
           
        }else {
            console.log(typeof (id_nomb));
            if (typeof (id_nomb) === "string") {
                data = this.bd.findOneAndUpdate({ Nombre: id_nomb }, dat)
                return data
            } else {
                console.log("Undefinido");
                return null
            }
        }
       
    }

    async Delete(id_nomb) {
        let data;
        const param = this.isValidObjectId(id_nomb)

        if (param) {
            data = await this.bd.deleteOne({_id: id_nomb})
           
         
           
        }else {
            console.log(typeof (id_nomb));
            if (typeof (id_nomb) === "string") {
                data = this.bd.deleteOne({ Nombre: id_nomb })
                
            } else {
                console.log("Undefinido");
                return null
            }
        }


       
    }
}





module.exports = CRUD