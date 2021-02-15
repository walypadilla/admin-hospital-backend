const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

// cors
app.use(cors());

// Lectura del body y parse
app.use(express.json());

//Base de datos
dbConnection();

// rutas
app.use('/api/', require('./routes/index'));

app.listen(3000, () => {
	console.log('Corriendo en el puerto 3000');
});
