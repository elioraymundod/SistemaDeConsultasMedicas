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

router.get('/muestras/items/asociados/:codigo_muestra',(req,res)=>{
    muestras.getItemsAsociados(req.params.codigo_muestra)
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

router.post('/etiquetea/muestra',(req,res)=>{
    muestras.insertEtiqueta(req.body)
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

router.put('/muestras/items',(req,res)=>{
    muestras.agregarItems(req.body)
                    .then(muestras=>{
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

router.put('/solicitudes/items/asociados',(req,res)=>{
    muestras.agregarItemsSolicitud(req.body)
                    .then(muestras=>{
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