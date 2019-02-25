'use strict';
const uuidv4 = require('uuid/v4');
var models = require('./../models');
var Producto = models.producto;
var Persona = models.persona;
var Venta = models.venta;
var Detalle = models.detalleVenta;
class VentaController {
    mostrarVenta(req, res) {
        res.render('template_admin',
                {titulo: "Venta",
                    fragmento: 'fragmentos/frm_venta',
                    rol: req.user.rol
                });
    }

    guardar(req, res) {
        var carrito = req.session.carrito;
        Persona.findOne({where: {external_id: req.user.id_persona}}).then(function (persona) {
            if (persona) {
                var venta = {
                    external_id: uuidv4(),
                    fecha: new Date(),
                    subtotal: req.body.subtotal,
                    iva: req.body.iva,
                    total: req.body.total,
                    id_persona: persona.id
                };
                Venta.create(venta).then(function (newVenta, created){
                    if(newVenta) {
                        var detalle = [];
                        for(var i = 0; i < carrito.length; i++) {
                            var aux = carrito[i];
                            var item = {cantidad: aux.cant, precio_unitario: aux.pu, precio_total: aux.pt, id_venta: newVenta.id, id_producto: aux.id};
                            detalle[i] = item;
                        }
                        Detalle.bulkCreate(detalleVenta).then(() => {                            
                            return Detalle.findAll({where:{id_venta: newVenta.id}}); 
                        }).then(detalles => {
                            detalles.forEach(function (item){
                                Producto.findOne({where: {id: item.id_producto}}).then(function (prod){
                                    Producto.update({ cantidad : prod.cantidad-item.cantidad },
                                    { where : { id : item.id_producto }});
                                });
                                req.session.carrito = [];
                                res.redirect("/");
                            }); 
                        });
                    }
                });
            }
        });
    }

}
module.exports = VentaController;
