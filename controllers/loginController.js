'use strict';
class CuentaController {
    verLogin(req, res) {
        res.render('login', {
            titulo: 'Inicio de sesion'
            //error: req.flash("err_cred")
        });
    }
    verRegistro(req, res) {
        res.render('sign_up', {
            
            titulo: 'Registro de usuarios'
            //error: req.flash("correo_repetido")
        });
    }
    
    cerrar(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
    
}
module.exports = CuentaController;