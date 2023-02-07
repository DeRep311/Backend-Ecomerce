import { LoadMessage } from "./sockets.js";
import { onHandlerSubmit } from "./UI.js";
const Form = document.querySelector('#chatForm')
let btn = document.getElementById('envio')

LoadMessage();





btn.addEventListener('click',onHandlerSubmit)

//Productos con faker
// fetch('http://localhost:8080/api/productos')

//     .then(response => response.json())
//     .then(async json => {
//         console.log(json);
//         const html = await obtenerPlantilla(json)
//         document.getElementById('productos').innerHTML = html
//     })
//     .catch(err => console.log('Solicitud fallida', err));




 