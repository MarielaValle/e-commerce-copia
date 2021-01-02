const express = require('express');
const router = express.Router();


const loggedUser = require("../middleware/loggedUser");

const pasarelaPagoController = require('../controllers/pasarelaPagoController');



router.post('/', loggedUser,pasarelaPagoController.raiz)






module.exports = router;