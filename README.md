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

###Rutas de carritos

*  `POST pi/cart`