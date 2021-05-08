const con = require('../Configs/cone');

module.exports={

    getAsociarBycodigoMuestra(codigoMuestra){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT me.*, ca.nombre as tipo_muestra, le.nombre as nombre_unidad FROM muestras_medicas_db.muestras as me '+
            'inner join muestras_medicas_db.datos_catalogos as ca on me.codigo_tipo_muestra = ca.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as le on me.unidad_medica= le.codigo_dato_catalogo '+
            'WHERE codigo_muestra = ?', codigoMuestra, (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },

    agregarItems(muestra){
        return new Promise((resolve,reject)=>{
            let query='UPDATE controlquejasdb.puntos_atencion SET codigo_estado = ?, nombre_punto_atencion=?, fecha_modificacion = ? WHERE codigo_punto_atencion = ?';
            console.log(muestra)
            con.query(query,[muestra.codigo_estado,
                muestra.nombre_punto_atencion,
                muestra.fecha_modificacion,
                muestra.codigo_punto_atencion],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

    insertMuestras(muestras){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO muestras_medicas_db.muestras SET ?';
            con.query(query,[muestras],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            }); 
        });
    },

    getAllMuestras(){
        return new Promise((resolve,reject)=>{
            con.query('select * from muestras_medicas_db.muestras',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 
}