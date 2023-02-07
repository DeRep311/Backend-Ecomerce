const Cart = require("./../Schemas/Cart");
const { Producto } = require("../Schemas/Product");
const log = require('winston')
const ObjectId = require('mongoose').Types.ObjectId



class CRUD {
    constructor() {
        this.bd = Producto;
    }

    async Create(param) {
        try {

            const data = new this.bd(param)
            const Status = await data.save()

            if (Status) {
                return data
            } else {
                log.error(ok)
                return false
            }
        } catch (error) {
            log.error(error.stack)
        }
    }

    isValidObjectId(id) {
        //Revisa si el string entregado es un objetid valido
        if (ObjectId.isValid(id)) {
            if ((String)(new ObjectId(id)) === id)
                return true;

        }
        return false;
    }
    async ReadAll() {
        try {
            const data = await this.bd.find()
            return { Validate: true, Product: data }
        } catch (error) {
            log.error(error.stack);
            return { Validate: false, Product: {} }
        }
    }

    async Read(id_nom) {
        //Valida que tipo de dato es para hacer la busqueda, ya que se puede buscar con nombre o su id 
        try {
            //es un objetid?, verifica
            if (this.isValidObjectId(id_nom)) {
                const data = await this.bd.findById(id_nom)

                return { Validate: true, Product: data }
            } else {
                //es un numero? (no esta en esta version la busqueda por codigo automatica)
                if (isNaN(id_nom)) {
                    //si no es confirma que sea un string
                    if (typeof (id_nom) === "string") {
                        const data = await this.bd.findOne({ Nombre: id_nom })
                        return { Validate: true, Product: data }
                    }
                } else {
                    //Le informo al dao de que la peticion no es valida
                    return { Validate: false, Error: 400 }
                }

            }

        } catch (error) {
            log.error(error.stack)
            return { Validate: false, Error: 500 }
        }
    }
    async Update(id_nomb, params) { 
        try {
            const config = { $set: params }

            const data = await this.bd.findOneAndUpdate({ _id: id_nomb }, config)
            log.info(data)
            return { Validate: true }
        } catch (error) {

            return { Validate: false }
            log.error(error.stack)
        }

    }

    async Delete(id_nomb) {

        try {

            if (this.isValidObjectId(id_nomb)) {
                const data = await this.bd.deleteOne({ _id: id_nomb })

                return { Validate: true, Error: 200 }
            } else {
                //es un numero? (no esta en esta version la busqueda por codigo automatica)
                if (isNaN(id_nomb)) {
                    //si no es confirma que sea un string
                    if (typeof (id_nomb) === "string") {
                        const data = await this.bd.deleteOne({ Nombre: id_nomb })
                        return { Validate: true, Error: 200 }
                    }
                } else {
                    //Le informo al dao de que la peticion no es valida
                    return { Validate: false, Error: 400 }
                }

            }

        } catch (error) {
            log.error(error.stack)
        }
    }
}





module.exports = CRUD