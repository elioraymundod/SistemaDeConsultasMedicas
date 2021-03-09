const con = require('../Configs/cone');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
//const SECRET_KEY = 'secretkey';


module.exports={
    login(usuario, password){
        return new Promise((resolve, reject)=>{
            con.query('SELECT * FROM controlquejasdb.usuarios where usuario = ? and password=?', [usuario, password], (err,rows)=> {
                
                if(err) reject(err);
                else resolve(rows);
            });
        });
    },
 
}