const DAO = require("./DAO")
const log = require('winston')
module.exports = {
     async VerifyPropiety(data){
           //Creo el error antes para poder agregarle una propiedad a modo de mensaje para especificar al usuario que le falta
           var error = new Error('Propiety')
           const objet = {}
           try {
 
                //Recorre los elementos para comparar si el objeto los tiene
                const ListElement = ['Nombre', 'Descripcion', 'Stock', 'Codigo', 'Foto', 'Precio']
                ListElement.forEach(element => {
 
                     if (!data.hasOwnProperty(element)) {
                          //si no lo tiene lanza el error especificando cual elemento
                          error.element = element
                          throw error
                     }
                     //en el caso de que no construye otro elemento a modo de filtro como si fuera un .map, lo hago pq paso el req.body y
                     //este pude tener propiedades que no se necesiten
                     objet[element] = data[element]
                });
               return {Validate: true, product: objet}
           } catch (error) {
                if (error.message === 'Propiety') {
                     return { Value: 'Missing', Propiety: error.element }
                }
                log.error(error)
 
           }
     },
     async newProdu(data) {
              const value= await this.VerifyPropiety(data)
               if (value.Validate) {
                    const objet= value.product
                    objet.Fecha= `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
                    const saving = await DAO.WriteProdu(data)
                    return saving
                    
               }else{
                    return value
               }
     },
     async deleteProdu(id) {
          try {
               return await DAO.DeleteProduById(id)
          } catch (error) {
               log.error(error);
          }
     },
     async getAllProdu(id) {
          //valida si existe un identificador o tiene que buscar todo
          try {
               if (id) {
                    const valor = await DAO.GetProduct(id)
                    return valor;
               } else {
                    const valor = await DAO.GetAll()
                    return valor;
               }
               
          } catch (error) {
               log.error(error);
          }
     },

     async ModProdu(id, data) {
          try {
               const value= await this.VerifyPropiety(data)
               if (value.Validate) {
                    const objet= value.product
                    objet.Fecha= `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
                    const saving = await DAO.ModifyProduct(id, objet)
                    return saving
                    
               }else{
                    return value
               }
               
          } catch (error) {
               log.error(error);
          }
     }


}