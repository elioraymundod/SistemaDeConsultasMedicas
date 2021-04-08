const catalogos = require('../Models/catalogos');
const express = require('express');
const router = express.Router();

router.get('/tipoSolicitante',(req,res)=>{
    catalogos.getTipoSolicitante()
                    .then(catalogos=>{
                        res.status(200).send(catalogos);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/tipoMuestra',(req,res)=>{
    catalogos.getTipoMuestra()
                    .then(catalogos=>{
                        res.status(200).send(catalogos);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});


router.get('/unidadDeMedida',(req,res)=>{
    catalogos.getUnidadDeMedida()
                    .then(catalogos=>{
                        res.status(200).send(catalogos);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});


router.get('/estados',(req,res)=>{
    catalogos.getEstadosSolicitud()
                    .then(catalogos=>{
                        res.status(200).send(catalogos);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});


router.get('/tipoSolicitud',(req,res)=>{
    catalogos.getTipoSolicitud()
                    .then(catalogos=>{
                        res.status(200).send(catalogos);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});



module.exports= router;