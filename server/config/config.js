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
    urlDB = 'mongodb+srv://cafeuser:7aPDTREAkWAtMKK@cafecluster-r39dp.mongodb.net/test?retryWrites=true&w=majority';
}

urlDB = 'mongodb+srv://cafeuser:7aPDTREAkWAtMKK@cafecluster-r39dp.mongodb.net/test?retryWrites=true&w=majority';
process.env.URLDB = urlDB

//