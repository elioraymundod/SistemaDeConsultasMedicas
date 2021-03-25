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

module.exports= router;