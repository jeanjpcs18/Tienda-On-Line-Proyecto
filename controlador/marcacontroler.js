'use strict';
var models = require('../models/index');
var Marca = models.marca;
var uuid = require('uuid/v4');

class marcaController{
    guardar(req, res){
        Marca.findOne({where: {nombreMarca: req.body.nombreMarca}}).then(marca =>{
            if(marca){
                console.log('Ya esta registrado');
                res.redirect('/admin');
            }else{
                var modeloMarca = {
                    codigo: req.body.codigoMarca,
                    nombreMarca: req.body.nombreMarca,
                    direccion: req.body.direccion,
                    external_id: uuid()
                };
            
                Marca.create(modeloMarca).then(newMarca => {
                    if(!newMarca){
                        console.log('Ocurrio un error al registrar');
                    }else if (newMarca){
                        console.log('se registro marca');
                    }  
                    res.redirect('/admin'); 
                });
            }
        });
    }
}

module.exports = marcaController;