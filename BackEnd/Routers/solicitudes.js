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


module.exports= router;
