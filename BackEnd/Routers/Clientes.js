const clientes = require('../Models/Clientes');
const express = require('express');
const router = express.Router();

router.get('/clientes/:nit_cliente',(req,res)=>{
    clientes.getClienteByNit(req.params.nit_cliente)
                    .then(clientes=>{
                        res.status(200).send(clientes);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

module.exports= router;