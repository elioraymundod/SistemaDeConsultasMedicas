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

    // , , no_soporte, usuario_asignacion, fecha_inicio, fecha_fin, nit, codigo_tipo_solicitud, codigo_estado
    getSolicitudes(codigo_solicitud, no_expediente, no_soporte){
        let consulta = 'select mm.* from muestras_medicas_db.solicitudes_de_muestras as mm where mm.codigo_solicitud = ? ';
        if (no_expediente !== '0') {
            consulta += ' and mm.no_expediente = ?';
        } 
        if (no_soporte !== '0'){
            consulta += ' and mm.no_soporte = ?'
        }
        return new Promise((resolve,reject)=>{
            con.query( consulta, [codigo_solicitud, no_expediente, no_soporte], (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   

    getSolicitudesByCodigo(codigo_solicitud){
        return new Promise((resolve,reject)=>{
            con.query( 'select mm.* from muestras_medicas_db.solicitudes_de_muestras as mm ' +
            'where mm.codigo_solicitud = ? ', codigo_solicitud, (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   

    getAllSolicitudes(){
        return new Promise((resolve,reject)=>{
            con.query('select * from muestras_medicas_db.solicitudes_de_muestras',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

   
}

