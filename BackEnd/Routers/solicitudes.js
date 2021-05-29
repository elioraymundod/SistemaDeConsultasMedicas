const solicitudes = require('../Models/solicitudes');
const express = require('express');
const router = express.Router();

router.post('/solicitudes/muestras/medicas',(req,res)=>{
    solicitudes.insertSolicitud(req.body)
                    .then(solicitudes=>{
                        res.status(200).send({
                            mesage:'Se creo la solicitud correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al crear solicitud'
                        });
                    });
});

router.post('/historial/estados',(req,res)=>{
    solicitudes.insertHistorialEstado(req.body)
                    .then(solicitudes=>{
                        res.status(200).send({
                            mesage:'Se creo el historial correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al crear historial'
                        });
                    });
});


router.get('/solicitudes/:codigo_solicitud/:no_expediente/:no_soporte/:usuario_asignacion/:nit/:codigo_tipo_solicitud/:codigo_estado/:fecha_inicio/:fecha_fin',(req,res)=>{
    solicitudes.getSolicitudes(req.params.codigo_solicitud, req.params.no_expediente, req.params.no_soporte, req.params.usuario_asignacion, req.params.nit, req.params.codigo_tipo_solicitud, req.params.codigo_estado, req.params.fecha_inicio, req.params.fecha_fin)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/solicitudes/centralizador/:usuario_asignacion',(req,res)=>{
    solicitudes.getSolicitudeByUsuarioAsignacion(req.params.usuario_asignacion)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/solicitudes/usuario/creacion/:usuario_creacion',(req,res)=>{
    solicitudes.getSolicitudeByUsuarioCreacion(req.params.usuario_creacion)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/comentarios/solicitud/estado/:codigo_solicitud/:codigo_estado',(req,res)=>{
    solicitudes.getComentariosByCodigoAndFase(req.params.codigo_solicitud, req.params.codigo_estado)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/historial/estados/:codigo_solicitud',(req,res)=>{
    solicitudes.getHistorialEstados(req.params.codigo_solicitud)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/login/:user/:pass',(req,res)=>{
    solicitudes.getLogin(req.params.user, req.params.pass)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/datos/user/:nit_usuario',(req,res)=>{
    solicitudes.getDatosUsuario(req.params.nit_usuario)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/etiquetas/:codigo_solicitud',(req,res)=>{
    solicitudes.getEtiquetasMuestras(req.params.codigo_solicitud)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/solicitudes/estado/usuario/:estado/:usuario',(req,res)=>{
    solicitudes.getSolicitudesByEstadoAndUsuario(req.params.estado, req.params.usuario)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/solicitudes/excel/:codigo_solicitud/:no_expediente/:no_soporte/:usuario_asignacion/:nit/:codigo_tipo_solicitud/:codigo_estado/:fecha_inicio/:fecha_fin',(req,res)=>{
    solicitudes.getSolicitudesExcel(req.params.codigo_solicitud, req.params.no_expediente, req.params.no_soporte, req.params.usuario_asignacion, req.params.nit, req.params.codigo_tipo_solicitud, req.params.codigo_estado, req.params.fecha_inicio, req.params.fecha_fin)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/solicitudes/por/codigo/:codigo_solicitud',(req,res)=>{
    solicitudes.getSolicitudesByCodigo(req.params.codigo_solicitud)
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/obtener/all/solicitudes/creadas',(req,res)=>{
    solicitudes.getAllSolicitudes()
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/obtener/usuarios/rnd',(req,res)=>{
    solicitudes.getCentralizador()
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/obtener/analistas/rnd',(req,res)=>{
    solicitudes.getAnalista()
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/obtener/revisor/rnd',(req,res)=>{
    solicitudes.getRevisor()
                    .then(solicitudes=>{
                        res.status(200).send(solicitudes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});


router.put('/solicitudes/eliminar',(req,res)=>{
    solicitudes.eliminarSolicitud(req.body)
                    .then(solicitudes=>{
                        res.status(200).send({
                            mesage:'Se actualizaron los datos correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al actualizar datos'
                        });
                    });
});

router.put('/asignar',(req,res)=>{
    solicitudes.asignarSolicitud(req.body)
                    .then(solicitudes=>{
                        res.status(200).send({
                            mesage:'Se actualizaron los datos correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al actualizar datos'
                        });
                    });
});

router.put('/usuarios',(req,res)=>{
    solicitudes.actualizarUsuario(req.body)
                    .then(solicitudes=>{
                        res.status(200).send({
                            mesage:'Se actualizaron los datos correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al actualizar datos'
                        });
                    });
});
module.exports= router;
