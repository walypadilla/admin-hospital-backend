const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

// cors
app.use(cors());

//Base de datos
dbConnection();

app.listen(3000, () => {
	console.log('Corriendo');
});
