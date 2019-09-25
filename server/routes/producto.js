const express = require('express');
const app = express();
const Producto = require('../models/producto');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const bodyParser = require('body-parser');
const _ = require('underscore');


// GET LISTAR TODOS LOS PRODUCTOS

app.get('/producto', verificaToken, function(req, res) {
    Producto.find({ disponible: true })
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                productos
            });

        });

});
// FIN GET LISTAR TODOS LOS PRODUCTOS

// LISTAR GET POR ID
app.get('/producto/:id', verificaToken, function(req, res) {

    let usuario = req.params.id;
    /*
        res.json({
            id
        });
    */
    Producto.findById(usuario)
        .populate('usuario', 'nombre email')
        .populate('categoria')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };
            res.json({
                ok: true,
                productoDB
            });
        });


});
// FIN LISTAR POR ID

// AGREGAR UNA PRODUCTO
app.post('/producto', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;
    let usuarioID = req.usuario._id;
    let categoriaID = req.get('categoriaID');

    /*
        return res.json({
                body,
                usuarioID,
                categoriaID

            })
            */

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: categoriaID,
        usuario: usuarioID
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});

// FIN AGREGAR PRODUCTO


// ACTUALIZAR PRODUCTO

app.put('/producto/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion']);
    /*
        return res.status(400).json({
            ok: true,
            body
        });
        */

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'no se encontro el producto'
                }
            });

        }



        res.json({
            ok: true,
            producto: productoDB
        });

    });

});


// FIN ACTUALIZAR PRODUCTO



// ELIMINACION CATEGORIA COMPLETA

app.delete('/producto/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id

    let cambiaEstado = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoBorrado) => {
        //Producto.findByIdAndRemove(id, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            producto: productoBorrado
        });

    });


});


// ELIMINAR CATEGORIA










// exportar modulo
module.exports = app;