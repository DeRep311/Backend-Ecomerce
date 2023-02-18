# Final-Proyect
## User story/brief: 

* Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras.

* Se implementará una API RESTful con los verbos get, post, put y delete para cumplir con todas las acciones necesarias.

* Debe brindar al frontend un mecanismo de ingreso autorizado al sistema basado en JWT (Json Web Token). 

* Los productos ingresados se almacenarán en una base de datos MongoDB. 

* El usuario podrá registrar sus credenciales de acceso (email y password) para luego poder ingresar a su cuenta. Estas credenciales serán guardadas en la base de datos MongoDB encriptando la contraseña.

* El cliente tendrá una sesión activa de usuario con tiempo de expiración configurable.

* Implementarás un canal de chat basado en websockets, el cual permita atender las consultas del cliente.

* La arquitectura del servidor estará basada en capas (MVC)

* El servidor podrá tomar configuraciones desde un archivo externo.

* Se enviará un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada.

## How to use

### Rutas de Productos: 
* `POST: /api/productos` Agregar producto, estructura de json en postman: 

  ```javascript
  {
    "Nombre": "(String)",
    "Descripcion": "(String)",
    "Stock": "(String)",
    "Codigo": "(int)",
    "Foto": "(Una url)",
    "Precio": "(String)"
  }
  ```
  En el caso de faltar alguna propiedad la aplicacion lo verificara y dara aviso

  ```javascript
  {
      "Value": "Missing",
      "Propiety": "(Propiedad faltante)"
  }

  ```

* `GET: /api/productos/:id` Listar productos, la respuesta si no se le da un id va ser un array de todos los productos ej: 

  ```javascript
  [
      {
          "_id": "63e282de4a7426704f581c62",
          "Nombre": "tipitoRandomme",
          "Descripcion": "nada",
          "Codigo": 32432,
          "Foto": "url",
          "Precio": 7000,
          "Stock": 56,
          "__v": 0
      },
      {
          "_id": "63ea9709741b5249ec388e00",
          "Nombre": "jijija",
          "Descripcion": "asdnksalnldsa",
          "Codigo": 21321,
          "Foto": "dsfdlsgfmdsgf",
          "Precio": 21321,
          "Stock": 56,
          "__v": 0
      }
  ]

  ```
  Tambien se le puede dar el id ej:  `id = 63ea9709741b5249ec388e00` : 
  ```javascript
  {
      "_id": "63ea9709741b5249ec388e00",
      "Nombre": "jijija",
      "Descripcion": "asdnksalnldsa",
      "Codigo": 21321,
      "Foto": "dsfdlsgfmdsgf",
      "Precio": 21321,
      "Stock": 56,
      "__v": 0
  }
  ```

  `BETA` Existe el caso que puedas escribir el nombre ej: `id = jijija`: 
  ```javascript
  {
      "_id": "63ea9709741b5249ec388e00",
      "Nombre": "jijija",
      "Descripcion": "asdnksalnldsa",
      "Codigo": 21321,
      "Foto": "dsfdlsgfmdsgf",
      "Precio": 21321,
      "Stock": 56,
      "__v": 0
  }
  ```
* `DELETE: /api/productos/id` elimina productos segun su id/ nombre, la respuesta va ser:
   `deleted`
   si no encuentra el producto va ser
   `Product not found`

*  `PUT : /api/productos/id` Actualiza un producto segun su id/ nombre , la por ej: 

 `PUT : /api/productos/63e282de4a7426704f581c62`
```javascript
  {
     "Nombre": "jijija",
    "Descripcion": "asdnksalnldsa",
    "Stock": "56",
    "Codigo": "21321",
    "Foto": "dsfdlsgfmdsgf",
    "Precio":"213"
  }
  ```
  respuesta: 
 ```javascript 
  {
    "Validate": true
}
  ```
  en caso de faltar algun argumento
  
  `Missing (propiedad)`

### Carrito:

#### Datos a tener en cuenta:

* Carrito de almacena en la session del usuario(Guardada en la mongostore como precaucion)
* Carrito solo almacena productos ya registrados
* Carrito solo se crea 1 por usuario

### Rutas de carritos

*  `POST api/cart` Creara un carrito de la fecha en ese momento y dara una respuesta ej: 
//
`Su carrito fue creado: {"Fecha":"(fecha actual)","Producto":[(vacio el array de productos pq no agrego todavia)]}`

En el caso de ya estar creado, simplemente respondera:
`Ya tiene un carrito creado`

* `DELETE api/cart` Elimina el carrito creado, su respuesta sera:
`Carrito a sido eliminado`

* `POST api/cart/id_nomb_productos` agrega al carrito produtos ya ingresados con su nombre o id ej de respuesta:
#### `Peticion: /api/cart/productos/jijija(nombre del producto)`

`Producto ingresado`

En el caso de que el producto no se encuentre o no este registrado respondera:

`Producto no encontrado`


* `GET api/cart/productos` Revisa los productos que tiene el carrito, respuesta: 


Si no tiene productos:
`No tiene productos`
Si los tiene:
````javascript
[
    {
        "_id": "63e282de4a7426704f581c62",
        "Nombre": "jijija",
        "Descripcion": "asdnksalnldsa",
        "Codigo": 21321,
        "Foto": "dsfdlsgfmdsgf",
        "Precio": 213,
        "Stock": 56,
        "__v": 0
    }
    
````

*  `DELETE api/cart/productos/id_Nombre_Producto` borra un producto del carrito entregando su nombre o id:

`Peticion: http://localhost:8080/api/cart/productos/jijija` 

Respuesta: `Producto borrado correctamente`

*  `GET api/cart/buy` Compra la lista de producto del carrito, tiene que estar logeado previamente en caso de que no lo este lo redirigira a /login:

`Respuesta: Compra realizada, le llegara un email con la informacion`

enviara un mail que no llega pero se ve que sale de la cuenta (no se pq nunca llega pq en realidad se envia)

## Usuarios

#### Datos a tener en cuenta:
* Genera un token jwt sin passport jwt, por cuestiones de bugs
* Todo el login esta echo sin passport

### Rutas de usuarios

(Trabajando en la documentacion)
