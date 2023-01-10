const { promises: fs } = require('fs')



class File {
    constructor(ruta) {
        this.ruta = ruta;
    }
    async ModifyById(id, data) {
        try {
            const Objeto = await this.getAll().then(res => {
                const indice = res.findIndex((elemento) => {
                    return elemento.id == id;

                })
                if (indice != -1) {
                    res[indice] = data;


                    fs.writeFile(this.ruta, JSON.stringify(res, null, 2))
                    console.log("echo");
                } else {
                    console.log("Id no encontrado");

                }

            })




        } catch (error) {
            console.log(error);
        }




    }

    async save(data) {

        try {

            let objet = await this.getAll();

            let newId;

            if (objet.length === 0) {

                newId = 1;

            } else {

                newId = objet[objet.length - 1].id + 1;

            }


            const newObj = { ...data, id: newId, Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}` };

            objet.push(newObj);


            await fs.writeFile(this.ruta, JSON.stringify(objet, null, 2));



        } catch (error) {

            throw new Error(`Error al guardar: ${error}`);

        }
    }
    async getById(id) {
        try {
            
            const objetos = await this.getAll();

            const nuevoObjeto = objetos.find(elemento => elemento.id == id);
            return nuevoObjeto;
        }
        catch (error) {
            console.log(`Error en conseguir id ${error}`);

        }
    }

    async getAll() {
        try {
            const objetos = JSON.parse(await fs.readFile(this.ruta, 'utf-8'));


            return objetos;

        } catch (error) {
            console.log(`Error al buscar la informacion ${error}`);

            return []
        }
    }

    async deleteById(id) {
        try {
            const ide= parseInt(id);
            const objetos = await this.getAll();

            const nuevoObjeto = objetos.filter(elemento => elemento.id !== ide);
            if (nuevoObjeto.length === objetos.length) {
                throw new Error('no se encontro el id')
            }

            fs.writeFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2));

        } catch (error) {
            console.log(`eliminar ${error}`);
        }

    }

    async deleteAll() {
        try {
            fs.writeFile(`./${this.ruta}`, '');
        } catch (error) {
            console.log(`Hubo un error ${error}`);
        }
    }
}

module.exports = File;