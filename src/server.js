//modulos
const express = require ('express');
const path = require('path');
const app = express();

//middleware
app.use(express.json());

//Router() + ruta
const approute = require(path.join(__dirname, '..', '/routes', 'routes.js'));

// Inicio
app.use ('/', approute);


//puerto
const PORT = process.env.PORT || 3000;

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
