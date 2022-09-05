const fs = require('./dao')
const cart = require('./model')

module.exports = {
    async newCart(req, res) {
        WriteCart({Fecha:`${new Date().toDateString()} ${new Date().toLocaleTimeString()}`})
    }
    async delete
}