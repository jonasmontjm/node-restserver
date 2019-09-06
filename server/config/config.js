//
// Puerto
//
process.env.PORT = process.env.PORT || 3000;

//
// Entorno
//

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//
// Vencimiento del token
//segundos minutos horas dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//
// SEED de autenticación
//
process.env.SEED = process.env.SEED || 'este-es-el-seed-desrrollo';
//
// googleID
//

process.env.CLIENT_ID = process.env.CLIENT_ID || '207143455029-tg8a022fvo26svs2jr07cj3n643onsen.apps.googleusercontent.com';


//
// Base de Datos
//

let urlDB;
//urlDB = 'mongodb://localhost:27017/cafe';

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
    console.log('desarrollo');
} else {
    //urlDB = process.env.MONGO_URI //';
    urlDB = 'mongodb: //localhost:27017/cafe';
    console.log('produccion');
}


process.env.URLDB = urlDB

//