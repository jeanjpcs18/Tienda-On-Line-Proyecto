var express = require('express');
var router = express.Router();
var passport= require('passport');
var cuenta = require('../controllers/loginController');
var cuentaController = new cuenta();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tienda On Line' });
});


router.get('/admin', function(req, res, next) {
  res.render('registra', { title: 'Registro' });
});

router.get('/login', cuentaController.verLogin);
router.get('/sign_up', cuentaController.verRegistro);


module.exports = router;
