const { response, request } = require('express');
const Tarea = require('../models/tarea');

const tareasGet = async (req = request, res = response) => {
	const tareas = await Tarea.find().populate('nombre');
	res.json({
		tareas,
	});
};

const tareasPut = async (req, res) => {
	console.log(req.body.estado);
	const { ...resto } = req.body;
	const { id } = req.params;

	const tarea = await Tarea.findByIdAndUpdate(id, resto);

	res.json(tarea);
};

const tareasPost = async (req, res) => {
	const { nombre, description, userEmail } = req.body;
	const tarea = new Tarea({ nombre, description, estado: false, userEmail });

	//Guardar en BD
	await tarea.save();

	res.json({
		tarea,
	});
};

const tareaDelete = async (req, res) => {
	const { id } = req.params;

	const tarea = await Tarea.findByIdAndDelete(id);

	res.json({ msg: 'Tarea eliminada: ', tarea });
};

module.exports = {
	tareasGet,
	tareasPut,
	tareasPost,
	tareaDelete,
};
