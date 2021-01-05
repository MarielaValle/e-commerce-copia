var express = require('express');
var router = express.Router();



const indexController = require('../controllers/indexController');
/* GET home page. */

router.get('/', indexController.raiz)

/*** Página administracion productos ***/
router.get('/dashboard/', indexController.dashboard);


router.get('/search/', indexController.search);

router.get('/pago_rechazado', indexController.rechazado);

router.get('/pago_exitoso', indexController.exitoso);





module.exports = router;
