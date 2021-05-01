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
    muestras.insertMuestras(req.body)
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


router.get('/obtener/all/muestras',(req,res)=>{
    muestras.getAllMuestras()
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