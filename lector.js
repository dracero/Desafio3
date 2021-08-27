import fs from 'fs';

class Contenedor {
    constructor(file){
        this.file = file
    }

    async getAll(){
        try {
            const archivo = await fs.promises.readFile(this.file)
            let exit =  JSON.parse(archivo)       
            console.log(exit)
            return exit
        } catch (error) {
            return []
        }
    }

    async leer(){
        try {
            const archivo = await fs.promises.readFile(this.file)
            const exit =  JSON.parse(archivo)       
            return exit
        } catch (error) {
            return []
        }
    }

  async getById(id){
    try {
      const data = await fs.promises.readFile(this.file)
      let exit = JSON.parse(data)
      let read = false
      for (let j = 0; j < exit.length; j++){
        if (exit[j].id === id){
            read = true;
            console.log (exit[j])
        }  
      }
      read ? null : console.log("no se encontrò el id") // si lo encuentra no hago nada, sino aviso que no està
    } catch (err) {
      return []
    }
  }

  async save(prod){
    try {
        const productos = await this.leer();
        let newProduct = new Producto(prod);
        newProduct.id = productos.length + 1
        productos.push(newProduct)
        await fs.promises.writeFile(this.file, JSON.stringify(productos, null, '\t'))

        } catch (error){
            console.log(error)
    }
}


  async deleteAll() {
    try {
      await fs.promises.unlink(this.file)
      console.log(this.file)
      console.log('Se ha eliminado el archivo')
    } catch (err) {
      return []
    }
  }

  async deleteById(id){
    try {
      const data = await fs.promises.readFile(this.file)
      let exit = JSON.parse(data)
      let erase = false;
      for (let j = 0; j < exit.length; j++){
        if (exit[j].id === id){//busco el id que me envían
          exit.splice(j, 1);//borro ese id y todo lo asociado
          erase = true;
          await fs.promises.writeFile(
            this.file,
            JSON.stringify(exit, null, '\t')
          )//lo grabo
        }  
      }
     erase ? console.log("borrado") : console.log("no se encontrò")
    } catch (err) {
      return []
    }
  }

} 

const contenedor = new Contenedor('./productos.txt');
export default contenedor;
