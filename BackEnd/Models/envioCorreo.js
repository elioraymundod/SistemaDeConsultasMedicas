const con = require('../Configs/cone');
require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports={ 
    enviarCorreo(datosCorreo) {
        return new Promise((resolve,reject)=>{
            let transportador = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'infobancomipistio@gmail.com',
                    pass: 'BancoMiPisti02020#'
                }
            });
            
            let mailOptions = {
                from: 'infobancomipistio@gmail.com',
                to: datosCorreo.paraCorreo,
                subject: datosCorreo.asuntoCorreo,
                text: datosCorreo.cuerpoCorreo
            };
            
            transportador.sendMail(mailOptions, function(err, data){
                if (err) {
                    console.log('error al enviar el correo');
                } else {
                    console.log('Correo enviado exitosamente');
                }
            });
        })
    },
  
}