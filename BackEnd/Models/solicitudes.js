const con = require('../Configs/cone');


module.exports={

    insertSolicitud(solicitud){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO muestras_medicas_db.solicitudes_de_muestras SET ?';
            con.query(query,[solicitud],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },

}

