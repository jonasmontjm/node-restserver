const jwt = require('jsonwebtoken');



let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();



    });

}


let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    console.log(usuario.nombre)

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: `No tiene permisos para agregar usuarios ${usuario.role}`
            }
        });


    }




};

module.exports = {
    verificaToken,
    verificaAdmin_Role
}