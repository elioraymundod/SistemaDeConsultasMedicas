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

    insertHistorialEstado(solicitud){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO muestras_medicas_db.historial_estados SET ?';
            con.query(query,[solicitud],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            }); 
        });
    },

    getSolicitudes(codigo_solicitud, no_expediente, no_soporte, usuario_asignacion, nit, codigo_tipo_solicitud, codigo_estado, fecha_inicio, fecha_fin){
        if (codigo_solicitud !== '0') {
            consulta = 'SELECT  mm.*, '+
            '(select ca.nombre from muestras_medicas_db.datos_catalogos as ca where ca.codigo_dato_catalogo = mm.codigo_tipo_solicitud) as tipo_solicitud,  '+
            '(select us.nombre_usuario from muestras_medicas_db.usuarios as us where mm.usuario_asignacion = us.nit_usuario) as usuario,  '+
            '(select caa.nombre from muestras_medicas_db.datos_catalogos as caa where mm.codigo_estado = caa.codigo_dato_catalogo) as estado,  '+
            '(select csa.nombre from muestras_medicas_db.datos_catalogos as csa where mm.codigo_tipo_soporte = csa.codigo_dato_catalogo) as tipo_soporte,  '+
            '(select sol.nombre from muestras_medicas_db.datos_catalogos as sol where mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo) as tipo_solicitante,  '+
            '(select so.nombre_cliente from muestras_medicas_db.clientes as so where mm.nit = so.nit_cliente) as solicitante,  '+
            '(select ex.observaciones from muestras_medicas_db.expedientes as ex where mm.no_expediente = ex.no_expediente) as observaciones_expediente,  '+
            '(select di.direccion_cliente from muestras_medicas_db.clientes as di where mm.nit = di.nit_cliente) as direccion_cliente, '+
            '(select tel.telefonos from muestras_medicas_db.clientes as tel where mm.nit = tel.nit_cliente) as telefono_cliente, ' + 
            '(select em.email from muestras_medicas_db.clientes as em where mm.nit = em.nit_cliente) as email_cliente ' +
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm where mm.codigo_solicitud = ? '; //and mm.codigo_estado <> 17
        } else {
            consulta = 'SELECT  mm.*, '+
            '(select ca.nombre from muestras_medicas_db.datos_catalogos as ca where ca.codigo_dato_catalogo = mm.codigo_tipo_solicitud) as tipo_solicitud,  '+
            '(select us.nombre_usuario from muestras_medicas_db.usuarios as us where mm.usuario_asignacion = us.nit_usuario) as usuario,  '+
            '(select caa.nombre from muestras_medicas_db.datos_catalogos as caa where mm.codigo_estado = caa.codigo_dato_catalogo) as estado,  '+
            '(select csa.nombre from muestras_medicas_db.datos_catalogos as csa where mm.codigo_tipo_soporte = csa.codigo_dato_catalogo) as tipo_soporte,  '+
            '(select sol.nombre from muestras_medicas_db.datos_catalogos as sol where mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo) as tipo_solicitante,  '+
            '(select so.nombre_cliente from muestras_medicas_db.clientes as so where mm.nit = so.nit_cliente) as solicitante,  '+
            '(select ex.observaciones from muestras_medicas_db.expedientes as ex where mm.no_expediente = ex.no_expediente) as observaciones_expediente,  '+
            '(select di.direccion_cliente from muestras_medicas_db.clientes as di where mm.nit = di.nit_cliente) as direccion_cliente, '+
            '(select tel.telefonos from muestras_medicas_db.clientes as tel where mm.nit = tel.nit_cliente) as telefono_cliente,  '+
            '(select em.email from muestras_medicas_db.clientes as em where mm.nit = em.nit_cliente) as email_cliente   '+
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+
            'where (mm.codigo_solicitud = ? or mm.no_expediente = ?   '+
            'or mm.no_soporte = ? or mm.usuario_asignacion = ? or mm.nit = ? or mm.codigo_tipo_solicitud = ? or mm.codigo_estado = ? or (mm.fecha_creacion >= ?  '+ 
            'and mm.fecha_creacion <= ?)) and mm.codigo_estado <> 17';
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
            consulta = 'SELECT  mm.codigo_solicitud, mm.no_expediente, mm.nit, mm.no_soporte, '+ 
            '(select csa.nombre from muestras_medicas_db.datos_catalogos as csa where mm.codigo_tipo_soporte = csa.codigo_dato_catalogo) as tipo_soporte, '+
            '(select sol.nombre from muestras_medicas_db.datos_catalogos as sol where mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo) as tipo_solicitante,  '+
            '(select ca.nombre from muestras_medicas_db.datos_catalogos as ca where ca.codigo_dato_catalogo = mm.codigo_tipo_solicitud) as tipo_solicitud,  '+
            '(select us.nombre_usuario from muestras_medicas_db.usuarios as us where mm.usuario_asignacion = us.nit_usuario) as usuario,  '+
            '(select caa.nombre from muestras_medicas_db.datos_catalogos as caa where mm.codigo_estado = caa.codigo_dato_catalogo) as estado, '+
            'mm.usuario_creacion, mm.fecha_creacion, mm.cantidad_de_muestras, mm.dias_de_items as cantidad_items, mm.dias_vencimiento, mm.descripcion, '+
            '(select so.nombre_cliente from muestras_medicas_db.clientes as so where mm.nit = so.nit_cliente) as solicitante,  mm.telefonos, mm.email  '+
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+
            'where mm.codigo_solicitud = ? '; // and mm.codigo_estado <> 17
        } else {
            consulta = 'SELECT  mm.codigo_solicitud, mm.no_expediente, mm.nit, mm.no_soporte, '+ 
            '(select csa.nombre from muestras_medicas_db.datos_catalogos as csa where mm.codigo_tipo_soporte = csa.codigo_dato_catalogo) as tipo_soporte, '+
            '(select sol.nombre from muestras_medicas_db.datos_catalogos as sol where mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo) as tipo_solicitante,  '+
            '(select ca.nombre from muestras_medicas_db.datos_catalogos as ca where ca.codigo_dato_catalogo = mm.codigo_tipo_solicitud) as tipo_solicitud,  '+
            '(select us.nombre_usuario from muestras_medicas_db.usuarios as us where mm.usuario_asignacion = us.nit_usuario) as usuario,  '+
            '(select caa.nombre from muestras_medicas_db.datos_catalogos as caa where mm.codigo_estado = caa.codigo_dato_catalogo) as estado, '+
            'mm.usuario_creacion, mm.fecha_creacion, mm.cantidad_de_muestras, mm.dias_de_items as cantidad_items, mm.dias_vencimiento, mm.descripcion, '+
            '(select so.nombre_cliente from muestras_medicas_db.clientes as so where mm.nit = so.nit_cliente) as solicitante,  mm.telefonos, mm.email  '+
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+
            'where (mm.codigo_solicitud = ? or mm.no_expediente = ?  '+
            'or mm.no_soporte = ? or mm.usuario_asignacion = ? or mm.nit = ? or mm.codigo_tipo_solicitud = ? or mm.codigo_estado = ? or (mm.fecha_creacion >= ?  '+
            'and mm.fecha_creacion <= ?)) and mm.codigo_estado <> 17';
        }
        return new Promise((resolve,reject)=>{
            con.query( consulta, [codigo_solicitud, no_expediente, no_soporte, usuario_asignacion, nit, codigo_tipo_solicitud, codigo_estado, fecha_inicio, fecha_fin], (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   

    getSolicitudeByUsuarioAsignacion(usuario_asignacion){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT  mm.*, '+
            '(select ca.nombre from muestras_medicas_db.datos_catalogos as ca where ca.codigo_dato_catalogo = mm.codigo_tipo_solicitud) as tipo_solicitud,  '+
            '(select us.nombre_usuario from muestras_medicas_db.usuarios as us where mm.usuario_asignacion = us.nit_usuario) as usuario,  '+
            '(select caa.nombre from muestras_medicas_db.datos_catalogos as caa where mm.codigo_estado = caa.codigo_dato_catalogo) as estado,  '+
            '(select csa.nombre from muestras_medicas_db.datos_catalogos as csa where mm.codigo_tipo_soporte = csa.codigo_dato_catalogo) as tipo_soporte,  '+
            '(select sol.nombre from muestras_medicas_db.datos_catalogos as sol where mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo) as tipo_solicitante,  '+
            '(select so.nombre_cliente from muestras_medicas_db.clientes as so where mm.nit = so.nit_cliente) as solicitante,  '+
            '(select ex.observaciones from muestras_medicas_db.expedientes as ex where mm.no_expediente = ex.no_expediente) as observaciones_expediente,  '+
            '(select di.direccion_cliente from muestras_medicas_db.clientes as di where mm.nit = di.nit_cliente) as direccion_cliente, '+
            '(select tel.telefonos from muestras_medicas_db.clientes as tel where mm.nit = tel.nit_cliente) as telefono_cliente ' + 
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm where mm.usuario_asignacion = ? and mm.codigo_estado <> 17 ', usuario_asignacion, (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   

    getSolicitudeByUsuarioCreacion(usuario_creacion){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT  mm.*, '+
            '(select ca.nombre from muestras_medicas_db.datos_catalogos as ca where ca.codigo_dato_catalogo = mm.codigo_tipo_solicitud) as tipo_solicitud,  '+
            '(select us.nombre_usuario from muestras_medicas_db.usuarios as us where mm.usuario_asignacion = us.nit_usuario) as usuario,  '+
            '(select caa.nombre from muestras_medicas_db.datos_catalogos as caa where mm.codigo_estado = caa.codigo_dato_catalogo) as estado,  '+
            '(select csa.nombre from muestras_medicas_db.datos_catalogos as csa where mm.codigo_tipo_soporte = csa.codigo_dato_catalogo) as tipo_soporte,  '+
            '(select sol.nombre from muestras_medicas_db.datos_catalogos as sol where mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo) as tipo_solicitante,  '+
            '(select so.nombre_cliente from muestras_medicas_db.clientes as so where mm.nit = so.nit_cliente) as solicitante,  '+
            '(select ex.observaciones from muestras_medicas_db.expedientes as ex where mm.no_expediente = ex.no_expediente) as observaciones_expediente,  '+
            '(select di.direccion_cliente from muestras_medicas_db.clientes as di where mm.nit = di.nit_cliente) as direccion_cliente, '+
            '(select tel.telefonos from muestras_medicas_db.clientes as tel where mm.nit = tel.nit_cliente) as telefono_cliente ' + 
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm where mm.usuario_creacion = ? and mm.codigo_estado <> 17', usuario_creacion, (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   

    getSolicitudesByCodigo(codigo_solicitud){
        return new Promise((resolve,reject)=>{
                con.query( 'SELECT  mm.*, '+
                '(select ca.nombre from muestras_medicas_db.datos_catalogos as ca where mm.codigo_tipo_solicitud = ca.codigo_dato_catalogo )as tipo_solicitud,  '+
                '(select us.nombre_usuario from muestras_medicas_db.usuarios as us where mm.usuario_asignacion = us.nit_usuario) as usuario, '+
                '(select caa.nombre from muestras_medicas_db.datos_catalogos as caa where mm.codigo_estado = caa.codigo_dato_catalogo) as estado, '+ 
                '(select csa.nombre from muestras_medicas_db.datos_catalogos as csa where mm.codigo_tipo_soporte = csa.codigo_dato_catalogo) as tipo_soporte,  '+
                '(select sol.nombre from muestras_medicas_db.datos_catalogos as sol where mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo) as tipo_solicitante,  '+
                '(select so.nombre_cliente from  muestras_medicas_db.clientes as so where mm.nit = so.nit_cliente) as solicitante,  '+
                '(select ex.observaciones from muestras_medicas_db.expedientes as ex where mm.no_expediente = ex.no_expediente) as observaciones_expediente, (select di.direccion_cliente from muestras_medicas_db.clientes as di where mm.nit = di.nit_cliente) as direccion_cliente,   '+
                '(select tel.telefonos from muestras_medicas_db.clientes as tel where mm.nit = tel.nit_cliente) as telefono_cliente,  '+
                '(select em.email from muestras_medicas_db.clientes as em where mm.nit = em.nit_cliente) as email_cliente   '+
                'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+ 
                'where mm.codigo_solicitud = ?', codigo_solicitud, (err,rows)=> {
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

    getSolicitudesByEstadoAndUsuario(estado, usuario){
        return new Promise((resolve,reject)=>{
            con.query('SELECT  mm.*, '+
            '(select ca.nombre from muestras_medicas_db.datos_catalogos as ca where ca.codigo_dato_catalogo = mm.codigo_tipo_solicitud) as tipo_solicitud,  '+
            '(select us.nombre_usuario from muestras_medicas_db.usuarios as us where mm.usuario_asignacion = us.nit_usuario) as usuario,  '+
            '(select caa.nombre from muestras_medicas_db.datos_catalogos as caa where mm.codigo_estado = caa.codigo_dato_catalogo) as estado,  '+
            '(select csa.nombre from muestras_medicas_db.datos_catalogos as csa where mm.codigo_tipo_soporte = csa.codigo_dato_catalogo) as tipo_soporte,  '+
            '(select sol.nombre from muestras_medicas_db.datos_catalogos as sol where mm.codigo_tipo_solicitante = sol.codigo_dato_catalogo) as tipo_solicitante,  '+
            '(select so.nombre_cliente from muestras_medicas_db.clientes as so where mm.nit = so.nit_cliente) as solicitante,  '+
            '(select ex.observaciones from muestras_medicas_db.expedientes as ex where mm.no_expediente = ex.no_expediente) as observaciones_expediente,  '+
            '(select di.direccion_cliente from muestras_medicas_db.clientes as di where mm.nit = di.nit_cliente) as direccion_cliente, '+
            '(select tel.telefonos from muestras_medicas_db.clientes as tel where mm.nit = tel.nit_cliente) as telefono_cliente,  '+
            '(select em.email from muestras_medicas_db.clientes as em where mm.nit = em.nit_cliente) as email_cliente   '+
            'FROM muestras_medicas_db.solicitudes_de_muestras as mm  '+
            'where mm.codigo_estado = ? and mm.usuario_asignacion = ?', [estado, usuario],(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getCentralizador(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT * FROM muestras_medicas_db.usuarios as us '+
            'where us.codigo_rol = 27 '+
            'order by us.fecha_modificacion asc',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getAnalista(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT * FROM muestras_medicas_db.usuarios as us '+
            'where us. codigo_rol = 28 ' +
            'order by us.fecha_modificacion asc',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getRevisor(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT * FROM muestras_medicas_db.usuarios as us '+
            'where us. codigo_rol = 29 '+
            'order by rand() ',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getEtiquetasMuestras(codigo_solicitud){
        return new Promise((resolve,reject)=>{
            con.query('SELECT * FROM muestras_medicas_db.etiqueta_de_muestra as us '+
            'where us.codigo_solicitud = ? ', codigo_solicitud,(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getLogin(user, pass){
        return new Promise((resolve,reject)=>{
            con.query('SELECT * FROM muestras_medicas_db.usuarios as us '+
            'where us.user_usuario = ? and us.password_usuario = ? ', [user, pass],(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getHistorialEstados(codigo_solicitud){
        return new Promise((resolve,reject)=>{
            con.query('SELECT us.*, (select ca.nombre from muestras_medicas_db.datos_catalogos ca where ca.codigo_dato_catalogo = us.codigo_estado) as estado, ' +
            '(select a.nombre_usuario from muestras_medicas_db.usuarios a where a.nit_usuario = us.usuario) as usuario_asignacion FROM muestras_medicas_db.historial_estados as us, '+
            '(select 0) as duracion, (select 0) as acumulado where us.codigo_solicitud = ? ', codigo_solicitud,(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getDatosUsuario(nit_usuario){
        return new Promise((resolve,reject)=>{
            con.query('select * from muestras_medicas_db.usuarios where nit_usuario = ?', nit_usuario,(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    eliminarSolicitud(solicitud){
        return new Promise((resolve,reject)=>{
            let query='UPDATE muestras_medicas_db.solicitudes_de_muestras SET codigo_estado = ?, fecha_modificacion = ?, usuario_modificacion = ?, ip_usuario_modificacion = ? WHERE codigo_solicitud = ?';
            console.log(solicitud)
            con.query(query,[solicitud.codigo_estado,
                solicitud.fecha_modificacion,
                solicitud.usuario_modificacion,
                solicitud.ip_usuario_modificacion,
                solicitud.codigo_solicitud],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

    asignarSolicitud(solicitud){
        return new Promise((resolve,reject)=>{
            let query='UPDATE muestras_medicas_db.solicitudes_de_muestras SET codigo_estado = ?, usuario_asignacion = ?, fecha_modificacion = ?, usuario_modificacion = ?, ip_usuario_modificacion = ?, usuario_anterior = ?, revisor_anterior = ? WHERE codigo_solicitud = ?';
            console.log(solicitud)
            con.query(query,[solicitud.codigo_estado,
                solicitud.usuario_asignacion,
                solicitud.fecha_modificacion,
                solicitud.usuario_modificacion,
                solicitud.ip_usuario_modificacion,
                solicitud.usuario_anterior,
                solicitud.revisor_anterior,
                solicitud.codigo_solicitud],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

    actualizarUsuario(usuario){
        return new Promise((resolve,reject)=>{
            let query='UPDATE muestras_medicas_db.usuarios SET fecha_modificacion = ?, usuario_modificacion = ?, ip_usuario_modificacion = ? WHERE nit_usuario = ?';
            console.log(usuario)
            con.query(query,[usuario.fecha_modificacion,
                usuario.usuario_modificacion,
                usuario.ip_usuario_modificacion,
                usuario.nit_usuario],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

    getComentariosByCodigoAndFase(codigo_solicitud, codigo_estado) {
        return new Promise((resolve,reject)=>{
            con.query('select * from muestras_medicas_db.historial_estados where codigo_solicitud = ? and codigo_estado = ? order by fecha_creacion desc', [codigo_solicitud, codigo_estado],(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }

   
}

