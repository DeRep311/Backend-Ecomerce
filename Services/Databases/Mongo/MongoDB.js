const Cart = require("./Schemas/Cart");
const {Producto} = require("./Schemas/Product");
const log = require('winston')
const ObjectId = require('mongoose').Types.ObjectId



class CRUD {
    constructor(Select) {

        if (Select == 'Prod') {
            this.bd = Producto;
        } if (Select == 'Cart') {
            this.bd = Cart;
        }
    }

    async Create(param) {
        try {
            log.info(param);
            const data = await  new this.bd(param)
            const ok = await data.save()
            
            if (ok) {
                return data
            } else {
                log.error(ok)
                return false
            }
        } catch (error) {
            log.error(error)
        }
    }

    isValidObjectId(id) {

        if (ObjectId.isValid(id)) {
            if ((String)(new ObjectId(id)) === id)
                return true;

        }
        return false;
    }

    async Read(id_nom) {

        if (this.isValidObjectId(id_nom)) {
            const data = await this.bd.findById(id_nom)
            log.info('Ok')
            return data
        } else {
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
        const config = { $set: params }
        const ubication = this.Read(id_nomb)
        const data = await this.bd.findOneAndUpdate({ _id: ubication.id }, config)
        log.info(data)
        return data

    }

    async Delete(id_nomb) {

      try {
          const objet = await this.Read(id_nomb)
          const data = await this.bd.deleteOne({ _id: objet.id })
          return data
  
      } catch (error) {
        log.error(error)
      }
    }
}





module.exports = CRUD