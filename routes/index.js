var express = require('express');
var router = express.Router();
<<<<<<< HEAD
=======

>>>>>>> 5f3b92c19fdc22a51ca96e0c04a8e0d17b99ce12
var producto = require("../controlador/productocontroler");
var productocontroler = new producto();
var categoria = require('../controlador/categoriacontroler');
var categoriacontroler = new categoria();
<<<<<<< HEAD
=======
var marca = require('../controlador/marcacontroler');
var marcacontroler = new marca();

var passport = require('passport');
var cuenta = require('../controllers/loginController');
var cuentaController = new cuenta();
var venta = require('../controllers/VentaController');
var ventaController = new venta();
>>>>>>> 5f3b92c19fdc22a51ca96e0c04a8e0d17b99ce12


var carro = require('../controllers/CarritoController');
var carrito = new carro();

var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
};

var auth2 = function middleWare(req, res, next) {
  if (!req.isAuthenticated()) {
      next();
  }
  res.redirect('/admin');
};
/* GET home page. */
router.get('/', auth2, function (req, res, next) {
  res.render('index', { title: 'Tienda On Line' });
});
<<<<<<< HEAD


router.get('/admin', categoriacontroler.cargarVista);

router.post('/guardarProducto', productocontroler.guardar);
router.post('/guardarCategoria', categoriacontroler.guardar);

module.exports = router;
=======
router.get('/admin', auth, function (req, res, next) {
  res.render('registra', { title: 'Registro' , 
                rol: req.user.rol});
});

router.post('/guardarProducto', productocontroler.guardar);
router.post('/guardarCategoria', categoriacontroler.guardar);
router.post('/guardarMarca', marcacontroler.guardar);

router.get('/dir', ventaController.verdir);


router.get('/login',auth2, cuentaController.verLogin);
router.get('/sign_up', auth2, cuentaController.verRegistro);
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

>>>>>>> 5f3b92c19fdc22a51ca96e0c04a8e0d17b99ce12

module.exports = router;