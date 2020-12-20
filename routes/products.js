const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
//var middles = require("../middleware/middles");

var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/productos'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


var upload = multer({ storage: storage })




/* GET home page. */

router.get('/', productsController.raiz);

//router.get('/detail/:id',productsController.detail)
router.get('/detail/:id', productsController.detail);


/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.formAlta); /* GET - Form to create */
router.post('/create/', upload.any(), productsController.crear); /* POST - Store in json o DB? */



/*** EDIT ONE PRODUCT ***/
//con Json poner /edit/:productID!!!
router.get('/edit/:id', productsController.edit); /* GET - Form to create */
router.put('/edit/:id', upload.any(), productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.destroy);

module.exports = router;
