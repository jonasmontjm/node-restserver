const express = require('express');
const app = express();
const Categoria = require('../models/categoria');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const bodyParser = require('body-parser');
const _ = require('underscore');



// GET LISTAR TODA LA CATEGORIA SIN PAGINACIÓN
app.get('/categoria', verificaToken, function(req, res) {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                categorias
            });




        });

});


// GET MOSTRAR UNA CATERIA POR ID
app.get('/categoria/:id', verificaToken, function(req, res) {

    let usuario = req.params.id;
    /*
        res.json({
            id
        });
    */
    Categoria.findById(usuario, 'descripcion')
        .exec((err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };
            res.json({
                ok: true,
                categoriaDB,
                categoriaID: categoriaDB._id
            });
        });


});


// AGREGAR UNA CATEGORIA
app.post('/categoria', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;
    let usuarioId = req.usuario._id;

    /*
        return res.json({
            body,
            usuario

        })*/

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: usuarioId
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


// ACTUALIZAR CATEGORIA

app.put('/categoria/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);


    return res.status(400).json({
        ok: true,
        body
    });

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


// FIN ACTUALIZAR CATEGORIA

// ELIMINACION CATEGORIA COMPLETA
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id


    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });





});


// ELIMINAR CATEGORIA





// exportar modulo
module.exports = app;