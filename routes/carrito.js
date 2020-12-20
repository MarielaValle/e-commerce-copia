var express = require('express');
var router = express.Router();

const loggedUser = require("../middleware/loggedUser");

const carritoController = require('../controllers/carritoController');
/* GET home page. */

router.get('/',loggedUser, carritoController.raiz);

/***CARRITO***/


router.post('/:id', loggedUser,carritoController.carritoAdd);

router.delete('/delete/:id', loggedUser,carritoController.itemDelete);







module.exports = router;