const mysql = require('mysql2');

// Create conecction
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'dbnotas'
});

// Connect to DB

connection.connect((err) => {
    if (err) {
        console.log('error en conexion con DB: ' + err.stack);
        return;
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Export conecction
module.exports = connection;