'use strict';
var models = require('../models/index');
var Producto = models.producto;
var uuid = require('uuid/v4');

var fs = require('fs');
var tamanio  = 1 * 1024 * 1024;
var extenciones = ['jpg', 'png', 'jpeg'];
var formidable = require('formidable');


class productoController{
    guardar(req, res){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
        Producto.findOne({where: {codigo: fields.codigo}}).then(function (Esproducto){
            if(Esproducto){
                res.redirect('/admin');
            }else{

                console.log(fields);

                var modeloProducto = {
                    codigo: fields.codigoProducto,
                    nombre: fields.nombreProducto,
                    marcas: fields.marcaPoducto,
                    caracteristicas: fields.descripcionProducto,
                    existencia: fields.existencia,
                    precio: fields.precioProducto,
                    modelo: fields.modeloProducto,
                    imagen: fields.imagen,
                    external_id: uuid() 
                };
                console.log(modeloProducto);
                Producto.create(modeloProducto).then(function (newProducto){
                    if(!newProducto){
                        console.log('No se ha guardado');
                    }else{
                        console.log("Se ha guardado");
                                console.log(fields);
                                var extencion = files.imagen.name.split(".").pop().toLowerCase();
                                if(extenciones.includes(extencion)){
                                    if(files.imagen.size <= tamanio){
                                        var nombreImagen = newProducto.external_id + "." + extencion;
                                        fs.rename(files.imagen.path, "public/images/" + nombreImagen, function(err){
                                            if(err)
                                                next(err);
                                                return Producto.update({
                                                    imagen: nombreImagen
                                                }, {where: {external_id: newProducto.external_id}}).then(function(newProductoEditado){
                                                    if(newProductoEditado){
                                                        console.log("Se ha guardado la imagen");
                                                        res.redirect('/admin');

                                                    }else{
                                                        console.log("No se ha guardado la imagen");
                                                        res.redirect('/admin');

                                                    }
                                                });
                                        });
                                    }else{
                                        productoController.eliminar(files.imagen.path);
                                        console.log("El archivo es grande");
                                        res.redirect('/admin');
                                    }
                                }else{
                                    productoController.eliminar(files.imagen.path);
                                    console.log("Error de extencion");
                                    res.redirect('/admin');
                                }
                            
                    }
                });

            }
        });
    });
    }
    static eliminar(link){
        fs.exists(link, function(exists){
            if(exists){
                console.log("File existe deteremin now");
                fs.unlinkSync(link);
            }else{
                console.log("No se borro" + link);
            }
        });
    }
}


module.exports = productoController;