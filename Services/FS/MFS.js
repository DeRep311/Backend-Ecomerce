const fs = require('fs')



class File {
    constructor(ruta) {
        this.ruta = ruta;
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


            const newObj = { ...data, id: newId };

            objet.push(newObj);


            fs.writeFile(this.ruta, JSON.stringify(objet, null, 2));



        } catch (error) {

            throw new Error(`Error al guardar: ${error}`);

        }

    }
    async getById(id) {
        try {
            const objetos = await this.getAll();

            const nuevoObjeto = objetos.find(elemento => elemento.id == id);
            return JSON.stringify(nuevoObjeto);
        }
        catch (error) {
            console.log(`Error en conseguir id ${error}`);

        }
    }

    async getAll() {
        try {
            let objetos = JSON.parse(await fs.readFile(this.ruta, 'utf-8'));


            return objetos;

        } catch (error) {
            console.log(`Error al buscar la informacion ${error}`);

            return []
        }
    }

    async deleteById(id) {
        try {

            const objetos = await this.getAll();

            const nuevoObjeto = objetos.filter(elemento => elemento.id !== id);
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

exports.module = File;