var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var producto = require("../controlador/productocontroler");
var productocontroler = new producto();
var categoria = require('../controlador/categoriacontroler');
var categoriacontroler = new categoria();
var marca = require('../controlador/marcacontroler');
var marcacontroler = new marca();
=======
var passport = require('passport');
var cuenta = require('../controllers/loginController');
var cuentaController = new cuenta();
var venta = require('../controllers/VentaController');
var ventaController = new venta();
>>>>>>> 99866a4efb08ea11008c2f953d818af67c405051

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


<<<<<<< HEAD
router.get('/admin', categoriacontroler.cargarVista);

router.post('/guardarProducto', productocontroler.guardar);
router.post('/guardarCategoria', categoriacontroler.guardar);
router.post('/guardarMarca', marcacontroler.guardar);
=======
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

>>>>>>> 99866a4efb08ea11008c2f953d818af67c405051

module.exports = router;

