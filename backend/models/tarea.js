const { Schema, model } = require('mongoose');

const TareaSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es obligatorio'],
	},
	description: {
		type: String,
		required: [true, 'La descripción  es obligatoria'],
	},
	estado: {
		type: Boolean,
		default: true,
	},
	userEmail: {
		type: String,
		required: true,
	},
});

TareaSchema.methods.toJSON = function () {
	const { __v, _id, ...tarea } = this.toObject();
	tarea.uid = _id;
	return tarea;
};

module.exports = model('Tarea', TareaSchema);
