const log = require('winston')
const Manager = require('../../Services/Databases/Mongo/Manager/ProductoManager')
const DB = new Manager();
module.exports = {
    async GetAll() {
        try {
            const valor = await DB.ReadAll()
            return valor;
        } catch (error) {
            log.error(error.stack);
        }
    },
    async GetProduct(id) {
        try {

            const valor = await DB.Read(id);
            // si no encuentra el producto enviara un null
            if (valor.Product) {
                return valor;
            } else {
                return { Validate: false, Error: 400 }
            }

        } catch (error) {
            log.error(error.stack);
        }
    },

    async WriteProdu(data) {
        try {
            //hace la peticion a la db
            const datos = await DB.Create(data)
            if (datos) {
                return { Status: true, Id: datos.id }
            }
            return { Status: false, Message: 'Error occurred saving data, try again' }

        } catch (error) {

            log.error(error.stack)

            return { Status: false, Message: 'Error occurred saving data, try again' }
        }
    }
    ,

    async DeleteProduById(id) {
        try {
            const exist = await this.GetProduct(id)
            if (exist.Validate) {
                await DB.Delete(id)
                return  { Validate: true, Error: 200, Message: 'Deleted' };
            } else {
                return { Validate: false, Error: 400, Message: 'Product not found' }
            }

           
        } catch (error) {
           log.error(error.stack);
        }
    },

    async ModifyProduct(id, data) {
        try {
            const exist = await this.GetProduct(id)
            if (exist.Validate) {
                const ok = await DB.Update(id, data)
                if (ok.Validate) {
                    return { Validate: true }
                } else {
                    return { Validate: false, Error: 500, Message: 'Occurred error' }
                }

            } else {
                return { Validate: false, Error: 400, Message: 'Product not found' }
            }


        } catch (error) {
            log.error(error.stack);
        }
    }





}
