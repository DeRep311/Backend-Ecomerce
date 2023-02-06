import { LoadMessage, saveMessage, newMessage } from "./sockets.js";

let Namee = document.getElementById('name')
let Last = document.getElementById('Last')
let Age = document.getElementById('age')
let nickname = document.getElementById('nick')
let Avatar = document.getElementById('avatar')
let email = document.getElementById('Gmail')
let mensaje = document.getElementById('mensaje')



let Name = document.getElementById('Name')
let price = document.getElementById('price')
let img = document.getElementById('img')

let btnIng = document.getElementById('submit')
btnIng.addEventListener('click', () => {
    socket.emit('newProduct', {
        name: Name.value,
        price: price.value,
        img: img.value

    })
})


export const onHandlerSubmit = (e) => {
    e.preventDefault()
    const message = {
        Mensajes: mensaje.value,
        email: email.value,
        tipo: 'user',

    }
    saveMessage(message)
    newMessage();
}