const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = '/api/usuarios';
		this.tareasPath = '/api/tareas';
		this.authPath = '/api/auth';

		//Conectar a la base de datos
		this.conectarDB();

		//Middlewares
		this.middlewares();

		//Rutas de mi APP
		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		//CORS
		this.app.use(cors());

		//Lectura y parseo del body json
		this.app.use(express.json());

		//Directorio Publico
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.authPath, require('../routes/auth'));
		this.app.use(this.usuariosPath, require('../routes/usuarios'));
		this.app.use(this.tareasPath, require('../routes/tareas'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Backend corriendo en el puerto:`, this.port);
		});
	}
}

module.exports = Server;
