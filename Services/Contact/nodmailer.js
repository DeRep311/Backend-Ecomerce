const mailer = require('nodemailer');
const log = require('winston');

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DIRECCION,
        pass: process.env.PASSGMAIL
    }
});
const mailOptionsDelivery = (email, datos, productos) => {
    try {
        const mail = {
            from: 'Servidor Node.js',
            to: `${email}`,
            subjet: 'Compra Confirmada',
            Text: `Son sus datos: <br>
                     Username: ${datos.username} <br>
                         Adress: ${datos.adress} <br>
                        Email: ${datos.email}<br 
                        Lista de productos: <br>
                        ${productos} `
        }
        log.info(mail)
        return mail
    } catch (error) {
       log.error(error);
    }
}
const mailOptions =  (email, datos) => {
    try {
        log.info(email, datos);

        const mail = {
            from: 'Servidor Node.js',
            to: `${email}`,
            subjet: 'Nuevo Registro',
            Text: `Son sus datos: <br>
                     Username: ${datos.username} <br>
                        Name: ${datos.name} <br>
                         Adress: ${datos.adress} <br>
                    Age: ${datos.age} <br>
                            Phone: ${datos.pre} ${datos.phone} <br>
                             Email: ${datos.email} `
        }
        return mail
    } catch (error) {
        log.error(error);
        return false
    }

}
const MailBuy = async (email, datos, productos) => {
    try {
        const info = await transporter.sendMail(await mailOptionsDelivery(email, datos, productos))
        log.info(info)
    } catch (error) {
        log.error(error.stack);
        return false
    }
}
const enviomail = async (datos) => {
    try {
        const { email } = datos
        const info = await transporter.sendMail(mailOptions(email, datos))
        console.log(info);
        return true
    } catch (error) {
        
        log.error(error.stack);
        return false
    }
}
module.exports = {
    enviomail,
    MailBuy
}