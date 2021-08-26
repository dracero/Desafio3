import express from 'express';
import fs from 'fs';

const app = express();

const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Resultados');
});

const server = app.listen(process.env.PORT || port, ()=> console.log(`Servidor en el puerto ${port}`))

const randomInteger = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min 
}


app.get('/productos', async (req, res) => {
    try {
        const archivo = await fs.promises.readFile('productos.txt','utf-8');
        let archivoParseado = JSON.parse(archivo);
        res.send({
            productos: archivoParseado
        });
    } catch (error) {
         console.log(error)
    }
})

app.get('/productosRandom', async (req, res) =>{
    try {
        const archivo = await fs.promises.readFile('productos.txt','utf-8')
        let archivoParseado = JSON.parse(archivo)
        res.send(archivoParseado[randomInteger(archivoParseado.length,0)])
    } catch (error) {
         console.log(error)
    }
})