import express from 'express';
import { router } from './Route/route.js';
import { CORS } from './midelwhare/cors.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
dotenv.config();

const app = express();
app.disable('x-powered-by');


app.use(express.json());
app.use(cookieParser()); 
app.use(CORS());
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.use('/user', router);
app.post('/logeado', async (req, res) => {
    const token = req.cookies.acces_token
    if(!token){
        res.status(500).send('Esta pagina esta protegida')
    }
    try{
        const data = jwt.verify(token,'this-is-an-awesone-primery-key-y-muy-seguro')
        console.log(data)
        res.status(200).render('logeado');
    }catch(error){
        res.status(404).send('ERROR 404');
    }

});


app.use((req, res) => {
    res.status(404).send('ERROR 404');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Está en el puerto: ' + PORT);
});
