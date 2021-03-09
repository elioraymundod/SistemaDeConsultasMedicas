const con = require('../Configs/cone');

module.exports={
    getTipoSolicitante(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT pa.*  FROM muestras_medicas_db.datos_catalogos as pa ' +
            'where pa.codigo_catalogo = 6',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  
}