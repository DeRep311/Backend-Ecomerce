import { LoadMessage, saveMessage, newMessage } from "./sockets.js";
var user;


let mensaje = document.getElementById('mensaje')
fetch('http://localhost:8080/datauser')

    .then(response => response.json())
    .then(async json => {
        console.log(json);
       user = json
    })
    .catch(err => console.log('Solicitud fallida', err));

export const onHandlerSubmit = (e) => {
    e.preventDefault()
    const message = {
        Mensajes: mensaje.value,
        email: user.Email,
        tipo: user.type,

    }
    saveMessage(message)
    newMessage();
}