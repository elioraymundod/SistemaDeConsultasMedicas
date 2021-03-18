const expedientes = require('../Models/expedientes');
const express = require('express');
const router = express.Router();

router.get('/expedientes/:no_expediente',(req,res)=>{
    expedientes.getExpedienteByNoExpediente(req.params.no_expediente)
                    .then(expedientes=>{
                        res.status(200).send(expedientes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/soporte/interno',(req,res)=>{
    expedientes.getTipoSoporteInterno()
                    .then(expedientes=>{
                        res.status(200).send(expedientes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/soporte/externo',(req,res)=>{
    expedientes.getTipoSoporteExterno()
                    .then(expedientes=>{
                        res.status(200).send(expedientes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

module.exports= router;