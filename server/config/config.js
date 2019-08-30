//
// Puerto
//
process.env.PORT = process.env.PORT || 3000;

//
// Entorno
//

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//
// Base de Datos
//
if (process.env.NODE_ENV === 'env') {
    urlDB = 'mongodb: //localhost:27017/cafe';
} else {
    urlDB = process.env.nombredb //';
}


process.env.URLDB = urlDB

//