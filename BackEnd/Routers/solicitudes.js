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


router.get('/solicitudes/:codigo_solicitud/:no_expediente/:no_soporte/:usuario_asignacion/:fecha_inicio/:fecha_fin/:nit/:codigo_tipo_solicitud/:codigo_estado',(req,res)=>{
    solicitudes.getSolicitudes(req.params.codigo_solicitud, req.params.no_expediente, req.params.no_soporte, req.params.usuario_asignacion, req.params.fecha_inicio,
        req.params.fecha_fin, req.params.nit, req.params.codigo_tipo_solicitud, req.params.codigo_estado)
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

router.get('/solicitudes/:codigo_solicitud',(req,res)=>{
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

module.exports= router;
