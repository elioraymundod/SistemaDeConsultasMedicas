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




module.exports= router;