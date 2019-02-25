var express = require('express');
var router = express.Router();
var passport = require('passport');
var cuenta = require('../controllers/loginController');
var cuentaController = new cuenta();
var venta = require('../controllers/VentaController');
var ventaController = new venta();

var carro = require('../controllers/CarritoController');
var carrito = new carro();

var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        
    }
};
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Tienda On Line' });
});


router.get('/admin', auth, function (req, res, next) {
  res.render('registra', { title: 'Registro' , 
                rol: req.user.rol});
});

router.get('/login', cuentaController.verLogin);
router.get('/sign_up', cuentaController.verRegistro);
/**
 * Login
 */
router.post('/login/iniciar', passport.authenticate('local-signin', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: true
}));
/**
 * Sign up
 */
router.post('/sign_up/save', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/sign_up',
  failureFlash: true
}));
/**
 * Log out
 */
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});
/**
 * Facebook
 */
router.get('/auth/facebook',
  passport.authenticate('facebook'));
/**
 * carrito
 */
router.get('/carrito/listado', carrito.mostrarCarrito);
router.get('/carrito/quitar/:external', carrito.quitar_item);
router.get('/carrito/agregar/:external', carrito.agregar_item);
router.get('/carrito/:external', carrito.cargarCarro);
/**
 * ventas
 */
router.get('/venta', ventaController.mostrarVenta);
router.post('/venta/guardar', ventaController.guardar);


module.exports = router;

