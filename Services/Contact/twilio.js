const log = require('winston');


const accountSid = process.env.accountSid;
const authToken = process.env.authToken; 
const client = require('twilio')(accountSid, authToken);

const Mensagge = async(info)=>client.messages
     .create({
       body: info,
       from: 'whatsapp:+14155238886',
       to: `whatsapp:${process.env.PHONE}`
     }).then(message => {
       log.info(message)
     }).catch(err => {
       console.log(err);
     }).done();

 
 



module.exports = {
  Mensagge
}