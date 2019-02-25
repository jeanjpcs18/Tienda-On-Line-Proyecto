var express = require('express');
var router = express.Router();
var producto = require("../controlador/productocontroler");
var productocontroler = new producto();
var categoria = require('../controlador/categoriacontroler');
var categoriacontroler = new categoria();


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


router.get('/admin', categoriacontroler.cargarVista);

router.post('/guardarProducto', productocontroler.guardar);
router.post('/guardarCategoria', categoriacontroler.guardar);

module.exports = router;

