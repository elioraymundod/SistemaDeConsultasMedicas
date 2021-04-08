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

    getSolicitudes(codigo_solicitud, no_expediente, no_soporte, usuario_asignacion, fecha_inicio, fecha_fin, nit, codigo_tipo_solicitud, codigo_estado){
        return new Promise((resolve,reject)=>{
            con.query( 'select mm.* from muestras_medicas_db.solicitudes_de_muestras as mm ' +
            'where mm.codigo_solicitud = ? '+
            'or mm.no_expediente = ? '+
            'or mm.no_soporte = ? '+
            'or mm.usuario_asignacion = ? '+
            'or mm.fecha_creacion BETWEEN ? and ? '+
            'or mm.nit = ? '+
            'or mm.codigo_tipo_solicitud = ? '+
            'or mm.codigo_estado = ?', codigo_solicitud, no_expediente, no_soporte, usuario_asignacion, fecha_inicio, 
            fecha_fin, nit, codigo_tipo_solicitud, codigo_estado,  (err,rows)=> {
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

