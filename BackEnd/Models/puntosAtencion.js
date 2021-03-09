const con = require('../Configs/cone');

module.exports={
    getAll(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT pa.*, ca.nombre as nombre_region, caa.nombre as estado_punto_atencion ' + 
            'FROM controlquejasdb.puntos_atencion as pa ' +
            'inner join controlquejasdb.datos_catalogos as ca on pa.codigo_region = ca.codigo_dato_catalogo ' +
            'inner join controlquejasdb.datos_catalogos as caa on pa.codigo_estado = caa.codigo_dato_catalogo',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  
    
    updatePuntosAtencion(puntoAtencion){
        return new Promise((resolve,reject)=>{
            let query='UPDATE controlquejasdb.puntos_atencion SET codigo_estado = ?, nombre_punto_atencion=?, fecha_modificacion = ? WHERE codigo_punto_atencion = ?';
            console.log(puntoAtencion)
            con.query(query,[puntoAtencion.codigo_estado,
                puntoAtencion.nombre_punto_atencion,
                puntoAtencion.fecha_modificacion,
                puntoAtencion.codigo_punto_atencion],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

    insertPuntoAtencion(puntoAtencion){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO controlquejasdb.puntos_atencion SET ?';
            con.query(query,[puntoAtencion],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },

    getPuntosAtencionByCodigo(codigo_region){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT * FROM controlquejasdb.puntos_atencion WHERE codigo_estado = 5 and codigo_region = ? ', codigo_region, (err,rows)=> {
                
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   

    getPuntosAtencionByNombre(nombre_punto_atencion, codigo_region){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT * FROM controlquejasdb.puntos_atencion WHERE nombre_punto_atencion = ? and codigo_region <> ?', 
            [nombre_punto_atencion, codigo_region], (err,rows)=> {
                
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  
    
    // Metodo para traer el total de usuarios por punto y si los usuarios estan activos en un punto externo
    getUsuariosExternosInternosByCodigoPunto(codigo_punto){
        return new Promise((resolve,reject)=>{
            con.query( 'select us.*, (select count(dpi_usuario) from controlquejasdb.usuarios_puntos_atencion ' + 
            'where codigo_punto = us.codigo_punto) as conteo_interno, (select count(dpi_usuario) ' + 
            'from controlquejasdb.usuarios_puntos_atencion where codigo_punto != us.codigo_punto and dpi_usuario = us.dpi_usuario ' + 
            'and codigo_estado = 5) as conteo_externo from controlquejasdb.usuarios_puntos_atencion as us where codigo_punto = ? GROUP BY dpi_usuario', 
            codigo_punto, (err,rows)=> {    
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  

    inactivarUsuariosByPunto(usuarioPuntoAtencion){
        return new Promise((resolve,reject)=>{
            con.query( 'UPDATE controlquejasdb.usuarios_puntos_atencion SET codigo_estado = 6 WHERE codigo_punto = ?', 
            usuarioPuntoAtencion.codigo_punto, (err,rows)=> {    
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  
}