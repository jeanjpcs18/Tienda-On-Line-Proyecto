var express = require('express');
var router = express.Router();
var passport = require('passport');
var cuenta = require('../controllers/loginController');
var cuentaController = new cuenta();
var carro = require('../controllers/CarritoController');
var carrito = new carro();
var venta = require('../controllers/VentaController');
var ventaController = new venta();


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

//carrito

app.get('/compra/carrito/listado', auth,  carrito.mostrarCarrito);
app.get('/compra/carrito/quitar/:external', auth,  carrito.quitar_item);
app.get('/compra/carrito/agregar/:external', auth,  carrito.agregar_item);
app.get('/compra/carrito/:external', auth,  carrito.cargarCarro);

//venta
app.get('/venta', auth,  ventaController.mostrarVenta);
app.post('/venta/guardar', auth,  ventaController.guardar


module.exports = router;
