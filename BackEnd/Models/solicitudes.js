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

    getSolicitudes(codigo_solicitud, no_expediente, no_soporte, usuario_asignacion, nit, codigo_tipo_solicitud, codigo_estado, fecha_inicio, fecha_fin){
        if (codigo_solicitud !== '0') {
            consulta = 'SELECT  mm.*, ca.nombre as tipo_solicitud, us.nombre_usuario as usuario, caa.nombre as estado, csa.nombre as tipo_soporte, '+
            'sol.nombre as tipo_solicitante, so.nombre_cliente as solicitante, ex.observaciones as observaciones_expediente, di.direccion_cliente as direccion_cliente, '+
            'tel.telefonos as telefono_cliente, em.email as email_cliente '+
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+
            'inner join muestras_medicas_db.datos_catalogos as ca on mm.codigo_tipo_solicitud = ca.codigo_dato_catalogo  '+
            'inner join muestras_medicas_db.usuarios as us on mm.usuario_asignacion = us.nit_usuario  '+
            'inner join muestras_medicas_db.datos_catalogos as caa on mm.codigo_estado = caa.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as csa on mm.codigo_tipo_soporte = csa.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as sol on mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.clientes as so on mm.nit = so.nit_cliente '+
            'inner join muestras_medicas_db.expedientes as ex on mm.no_expediente = ex.no_expediente '+
            'inner join muestras_medicas_db.clientes as di on mm.nit = di.nit_cliente '+
            'inner join muestras_medicas_db.clientes as tel on mm.nit = tel.nit_cliente '+
            'inner join muestras_medicas_db.clientes as em on mm.nit = em.nit_cliente where mm.codigo_solicitud = ?';
        } else {
            consulta = 'SELECT  mm.*, ca.nombre as tipo_solicitud, us.nombre_usuario as usuario, caa.nombre as estado, csa.nombre as tipo_soporte, '+
            'sol.nombre as tipo_solicitante, so.nombre_cliente as solicitante, ex.observaciones as observaciones_expediente, di.direccion_cliente as direccion_cliente, '+
            'tel.telefonos as telefono_cliente, em.email as email_cliente '+
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+
            'inner join muestras_medicas_db.datos_catalogos as ca on mm.codigo_tipo_solicitud = ca.codigo_dato_catalogo  '+
            'inner join muestras_medicas_db.usuarios as us on mm.usuario_asignacion = us.nit_usuario  '+
            'inner join muestras_medicas_db.datos_catalogos as caa on mm.codigo_estado = caa.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as csa on mm.codigo_tipo_soporte = csa.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as sol on mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.clientes as so on mm.nit = so.nit_cliente '+
            'inner join muestras_medicas_db.expedientes as ex on mm.no_expediente = ex.no_expediente '+
            'inner join muestras_medicas_db.clientes as di on mm.nit = di.nit_cliente '+
            'inner join muestras_medicas_db.clientes as tel on mm.nit = tel.nit_cliente '+
            'inner join muestras_medicas_db.clientes as em on mm.nit = em.nit_cliente where mm.codigo_solicitud = ? or mm.no_expediente = ? '+ 
            'or mm.no_soporte = ? or mm.usuario_asignacion = ? or mm.nit = ? or mm.codigo_tipo_solicitud = ? or mm.codigo_estado = ? or mm.fecha_creacion >= ? ' +
            'or mm.fecha_creacion <= ?';
        }
        return new Promise((resolve,reject)=>{
            con.query( consulta, [codigo_solicitud, no_expediente, no_soporte, usuario_asignacion, nit, codigo_tipo_solicitud, codigo_estado, fecha_inicio, fecha_fin], (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   

    getSolicitudesExcel(codigo_solicitud, no_expediente, no_soporte, usuario_asignacion, nit, codigo_tipo_solicitud, codigo_estado, fecha_inicio, fecha_fin){
        if (codigo_solicitud !== '0') {
            consulta = 'SELECT  mm.codigo_solicitud, mm.no_expediente, mm.nit, mm.no_soporte, csa.nombre as tipo_soporte, sol.nombre as tipo_solicitante, '+
            'ca.nombre as tipo_solicitud, us.nombre_usuario as usuarioAsignacion, caa.nombre as estado, mm.usuario_creacion, mm.fecha_creacion, mm.cantidad_de_muestras, '+
            'mm.dias_de_items as cantidad_items, mm.dias_vencimiento, mm.descripcion, so.nombre_cliente as solicitante, mm.telefonos, mm.email '+
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+
            'inner join muestras_medicas_db.datos_catalogos as ca on mm.codigo_tipo_solicitud = ca.codigo_dato_catalogo  '+
            'inner join muestras_medicas_db.usuarios as us on mm.usuario_asignacion = us.nit_usuario  '+
            'inner join muestras_medicas_db.datos_catalogos as caa on mm.codigo_estado = caa.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as csa on mm.codigo_tipo_soporte = csa.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as sol on mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.clientes as so on mm.nit = so.nit_cliente '+
            'inner join muestras_medicas_db.expedientes as ex on mm.no_expediente = ex.no_expediente '+
            'inner join muestras_medicas_db.clientes as di on mm.nit = di.nit_cliente '+
            'inner join muestras_medicas_db.clientes as tel on mm.nit = tel.nit_cliente '+
            'inner join muestras_medicas_db.clientes as em on mm.nit = em.nit_cliente where mm.codigo_solicitud = ?';
        } else {
            consulta = 'SELECT  mm.codigo_solicitud, mm.no_expediente, mm.nit, mm.no_soporte, csa.nombre as tipo_soporte, sol.nombre as tipo_solicitante, '+
            'ca.nombre as tipo_solicitud, us.nombre_usuario as usuarioAsignacion, caa.nombre as estado, mm.usuario_creacion, mm.fecha_creacion, mm.cantidad_de_muestras, '+
            'mm.dias_de_items as cantidad_items, mm.dias_vencimiento, mm.descripcion, so.nombre_cliente as solicitante, mm.telefonos, mm.email '+
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+
            'inner join muestras_medicas_db.datos_catalogos as ca on mm.codigo_tipo_solicitud = ca.codigo_dato_catalogo  '+
            'inner join muestras_medicas_db.usuarios as us on mm.usuario_asignacion = us.nit_usuario  '+
            'inner join muestras_medicas_db.datos_catalogos as caa on mm.codigo_estado = caa.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as csa on mm.codigo_tipo_soporte = csa.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.datos_catalogos as sol on mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo '+
            'inner join muestras_medicas_db.clientes as so on mm.nit = so.nit_cliente '+
            'inner join muestras_medicas_db.expedientes as ex on mm.no_expediente = ex.no_expediente '+
            'inner join muestras_medicas_db.clientes as di on mm.nit = di.nit_cliente '+
            'inner join muestras_medicas_db.clientes as tel on mm.nit = tel.nit_cliente '+
            'inner join muestras_medicas_db.clientes as em on mm.nit = em.nit_cliente where mm.codigo_solicitud = ? or mm.no_expediente = ? '+ 
            'or mm.no_soporte = ? or mm.usuario_asignacion = ? or mm.nit = ? or mm.codigo_tipo_solicitud = ? or mm.codigo_estado = ? or mm.fecha_creacion >= ? ' +
            'or mm.fecha_creacion <= ?';
        }
        return new Promise((resolve,reject)=>{
            con.query( consulta, [codigo_solicitud, no_expediente, no_soporte, usuario_asignacion, nit, codigo_tipo_solicitud, codigo_estado, fecha_inicio, fecha_fin], (err,rows)=> {
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

