var express = require('express');
var router = express.Router();
var producto = require("../controlador/productocontroler");
var productocontroler = new producto();
var categoria = require('../controlador/categoriacontroler');
var categoriacontroler = new categoria();
var marca = require('../controlador/marcacontroler');
var marcacontroler = new marca();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tienda On Line' });
});


router.get('/admin', categoriacontroler.cargarVista);

router.post('/guardarProducto', productocontroler.guardar);
router.post('/guardarCategoria', categoriacontroler.guardar);
router.post('/guardarMarca', marcacontroler.guardar);

module.exports = router;
