const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { existeTareaPorId } = require('../helpers/db-validators');
const { tareasGet, tareasPut, tareasPost, tareaDelete } = require('../controllers/tareas');
const router = Router();

router.get('/', tareasGet);

router.post('/', [check('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos], tareasPost);

router.put('/', [check('id', 'No es un ID válido de Mongo').isMongoId(), check('id').custom(existeTareaPorId)], tareasPut);

router.delete('/:id', [check('id', 'No es un ID válido de Mongo').isMongoId(), check('id').custom(existeTareaPorId), validarCampos], tareaDelete);

module.exports = router;
