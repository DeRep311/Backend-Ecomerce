const log= require('winston')
module.exports = {
    async productos(datos){
        var data="";
        datos=datos.Producto
        
        
        
        datos.forEach(element => {
            
            if(element){
                delete element._id 
                delete element.Stock 
                delete element.__v
                 data += `${JSON.stringify(element)},`
            }
            log.info(data)
            
       });
        
        return data
    }
}
