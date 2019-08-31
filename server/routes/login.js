const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');



app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o Contraseña incorrectos'
                }
            });

        };

        if (usuarioDB.password === body.password) {
            let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 });
            res.json({
                ok: true,
                usuario: usuarioDB,
                token,
                message: 'Se encontro coincidencia'

            });
        } else {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (Contraseña) incorrectos'
                },

                email_enviado: body.email,
                password_enviado: body.password,
                email_encontrado: usuarioDB.email,
                password_encontrado: usuarioDB.password


            });

        };





    });

    /*
        res.json({
            ok_listo: true

        });
    */

});






module.exports = app;