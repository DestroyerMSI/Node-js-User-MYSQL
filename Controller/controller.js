import { VAlidadorr } from "../Validador.js";
import { MYSQLDATA } from "../Modal/Mysql.js";

import jwt from 'jsonwebtoken' 
export class Controllers {
    static async login(req, res) {
        try {
            const validado = VAlidadorr(req.body);
            
      if (validado.success) {
        const results = await MYSQLDATA.login(validado);
        const { user_name, user_password } = validado.data;
        const token = jwt.sign({username: user_name, password: user_password }, 'this-is-an-awesone-primery-key-y-muy-seguro', {
           expiresIn: '1h',
         });

          if (results && results.length > 0) {
            res.cookie('acces_token', token, {
                   httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
             }).status(200).send({ user_name, token });
                } else {
              res.status(400).send(`No se encontró el usuario ${validado.data.user_name}`);
                }
            } else {
                console.error('Ha ocurrido un error de validación:', validado.error);
                res.status(400).send('Error de validación: ' + validado.error.errors);
            }
        } catch (error) {
            console.error('Ha ocurrido un error en el controlador login:', error);
            res.status(500).send('ERROR 500: ' + error.message);
        }
    }
    static async register(req,res){
        try{
        const Validado = VAlidadorr(req.body)
        if(Validado.success){
   const result = await MYSQLDATA.register(Validado)
   if(result){
    res.status(201).send(result)
   }
   else{
    res.status(400).send('No se ha podido crear el usuario')
   }
        }else{
            res.status(500).send(`Error ${Validado.error.errors}`)
        }
    }catch(error){
        throw new Error('A ocurrido un error en el controlador register '   + error)
    }
    }
}
