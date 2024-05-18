const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {
	const { correo, password } = req.body;

	try {
		//Si el usuario existe por CORREO en la base de datos
		const usuario = await Usuario.findOne({ correo });
		if (!usuario) {
			return res.status(400).json({
				msg: 'Usuario o password incorrectos - correo',
			});
		}
		//Si el usuario esta activo en la BD
		if (!usuario.estado) {
			return res.status(400).json({
				msg: 'El usuario no esta activo en la BD - estado',
			});
		}

		//Verificar PASSWORD
		const validPassword = bcryptjs.compareSync(password, usuario.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'Usuario o password incorrectos - password',
			});
		}

		//Generar el JWT
		const token = await generarJWT(usuario.id);

		res.json({
			usuario,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const register = async (req, res) => {
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	//Encriptar el password
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	//Guardar en BD
	await usuario.save();

	res.json({
		usuario,
	});
};

module.exports = {
	login,
	register,
};
