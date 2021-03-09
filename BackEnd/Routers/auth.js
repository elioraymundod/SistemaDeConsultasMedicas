const user = require('../Models/auth');
const express = require('express');
const router = express.Router();

router.get('/login/:usuario/:password',(req,res)=>{
    user.login(req.params.usuario, req.params.password)
        .then(user=>{
            res.status(200).send(user);
        })
        .catch(err=>{
            console.error(err);
            res.status(500).send({
                mesage:'Error en login'
            });
        });

});

module.exports= router;