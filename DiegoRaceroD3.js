import express from 'express';
import contenedor from "./lector.js";

const app = express();

const port = 8080;

app.use(express.static('public'));

//aca llamo a la página estática
app.get('/', (req, res) => {
    res.send('Resultados');
});

const server = app.listen(process.env.PORT || port, ()=> console.log(`Servidor en el puerto ${port}`))

const randomInteger = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min 
}


app.get('/productos', async (req, res) => {
    try {
        const prod = await contenedor.getAll();
        res.send({
            productos: prod
        });
    } catch (error) {
         console.log(error)
    }
})

app.get('/productosRandom', async (req, res) =>{
    try {
        const prod = await contenedor.getAll();
        res.send(prod[randomInteger(prod.length,0)])
    } catch (error) {
         console.log(error)
    }
})