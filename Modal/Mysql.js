import mysql from 'mysql2/promise';
const HOST = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'root'
const password = process.env.DB_PASSWORD || 'Naruto03*'
const database = process.env.DB_NAME || 'users'
const DB_PORT = process.env.DB_PORT || '3306'
const config = {
    host: HOST,
    port: DB_PORT,
    user: user,
    password: password,
    database: database
};

const pool = mysql.createPool(config);

export class MYSQLDATA {
    
    static async login(object) {
        try {
            const { user_name, user_password } = object.data;
            const [usuarios] = await pool.query(
                `SELECT id, user_name, user_password FROM usuarios WHERE user_name = ?`,
                [user_name]
            );

          

            const usuario = usuarios[0];
            console.log(usuario);

          
            if (usuario.user_password !== user_password) {
                throw new Error('Contraseña incorrecta');
            }

            return usuario.user_name; 
        } catch (error) {
            throw new Error('Ha ocurrido un error en el MySQL login: ' + error.message);
        }
    } 
    static async register(object){
       try{
        const { user_name, user_password } = object.data;
        const [userfind] = await pool.query('SELECT id FROM usuarios WHERE user_name = ?', 
            [user_name]
        )

        if(userfind.length > 0){
          const resutlado = 'Este usuario ya existe'
            return resutlado
        }else{
            const [[{idd}]] = await pool.query('SELECT UUID() AS idd')
           
          const insertado = await pool.query(`INSERT INTO usuarios (id,user_name,user_password) VALUES(UUID_TO_BIN(?),?,?)`,
            [idd,user_name,user_password]
          )
     
          return `Se ha registrado el usuario ${user_name}`
        }}catch(error){
            throw new Error('A courrido un error en el mysql register' + error.message)
        }
    }
}
