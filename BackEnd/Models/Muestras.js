const con = require('../Configs/cone');

module.exports={

    getAsociarBycodigoMuestra(codigoMuestra){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT * FROM muestras_medicas_db.muestras WHERE codigo_muestra = ? ', codigoMuestra, (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },
}