const muestras = require('../Models/Muestras');
const express = require('express');
const router = express.Router();


router.get('/muestras/:codigoMuestra',(req,res)=>{
    muestras.getAsociarBycodigoMuestra(req.params.codigoMuestra)
                    .then(muestras=>{
                        res.status(200).send(muestras);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                       });
                    });

});

router.post('/muestras/muestras/medicas',(req,res)=>{
    solicitudes.insertSolicitud(req.body)
                    .then(muestras=>{
                        res.status(200).send({
                            mesage:'Se creo la muestra correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al crear muestra'
                        });
                    });
});

module.exports= router;