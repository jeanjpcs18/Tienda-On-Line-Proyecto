'use strict';
var models = require('../models/index');
var Categoria = models.categoria;
var uuid = require('uuid/v4');

class categoriaController{
    cargarVista(req, res){
        Categoria.findAll().then(function(categorias){
            if(categorias){
                res.render('registra', { title: 'Registro', categoria: categorias });
            }
        });
    }
    guardar(req, res){
        Categoria.findOne({where: {nombreCategoria: req.body.nombreCategoria}}).then(categoria =>{
            if(categoria){
                console.log('Ya esta registrado');
                res.redirect('/admin');
            }else{
                var modeloCategoria = {
                    codigo: req.body.codigoCategoria,
                    nombreCategoria: req.body.nombreCategoria,
                    descripcion: req.body.descripcionCategoria,
                    external_id: uuid()
                };
            
                Categoria.create(modeloCategoria).then(newCategoria => {
                    if(!newCategoria){
                        console.log('Ocurrio un error al registrar');
                    }else if (newCategoria){
                        console.log('se registro categoria');
                    }  
                    res.redirect('/admin'); 
                });
            }
        });
    }
}

module.exports = categoriaController;