const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Tarea = require('../models/tarea');

const esRoleValido = async (rol = '') => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) {
		throw new Error(`El rol ${rol} no está registrado en la BD`);
	}
};

const emailExiste = async (correo = '') => {
	const existeEmail = await Usuario.findOne({ correo });
	if (existeEmail) {
		throw new Error(`El correo: ${correo}, ya está registrado en la BD`);
	}
};

const existeUsuarioPorId = async (id) => {
	const existeUsuario = await Usuario.findById(id);
	if (!existeUsuario) {
		throw new Error(`El id no existe: ${id}`);
	}
};
const existeTareaPorId = async (id) => {
	const existeTarea = await Tarea.findById(id);
	if (!existeTarea) {
		throw new Error(`La tarea con ese id no existe id: ${id}`);
	}
};

module.exports = {
	esRoleValido,
	emailExiste,
	existeUsuarioPorId,
	existeTareaPorId,
};
