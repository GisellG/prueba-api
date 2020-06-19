const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

//tiene una especie de "hilos", que entiende fallos
const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Opps! La conexion con la base de datos fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Opps! La base de datos tiene demasiadas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Opps! La conexion a la base de datos fue rechazada');
        }
    }

    if(connection) connection.release();
    console.log('¡La base de datos está conectada!');
    return;
});

//Promisify pool query. Estamos convirtiendo en promesas lo que antes era en callbacks

pool.query = promisify(pool.query);


module.exports = pool;