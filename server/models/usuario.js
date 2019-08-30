const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },

    password: {
        type: String,
        required: [true, ' Contraseña obligatoria']
    },
    img: {
        type: String,
        required: false
    },

    role: {
        type: String,
        default: true,
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    }, //boleano
    google: {
        type: Boolean,
        default: false
    } //boleano


});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('usuario', usuarioSchema);