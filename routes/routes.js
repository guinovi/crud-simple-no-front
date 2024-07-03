//modulos
const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

//controller
const controllers = require(path.join(__dirname, '..', 'controllers', 'controller.js'));

//rutas
router.get('/', controllers.getAll);
router.get('/:id', controllers.getID);
router.post('/', controllers.postItem);
router.put('/:id', controllers.putItem);
router.delete('/:id', controllers.deleteItem);

module.exports = router