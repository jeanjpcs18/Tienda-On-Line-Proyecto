var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tienda On Line' });
});


router.get('/admin', function(req, res, next) {
  res.render('registra', { title: 'Registro' });
});

router.get('/reg', function(req, res, next){
  res.render('login', {title: 'Login', fragmento: 'fragmentos/frm_login'});
});
module.exports = router;
