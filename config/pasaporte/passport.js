var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');
module.exports = function(passport, cuenta, persona, rol){
    //configracion de modelos
    var Cuenta = cuenta;
    var Persona = persona;
    var Rol = rol;
    var LocalStrategy = require('passport-local').Strategy;
    console.log("General");
    passport.serializeUser(function (cuenta, done){
        console.log(done);
        done(null, cuenta.id);
    });

    //used to deserialize the user
    passport.deserializeUser(function (id, done){
        Cuenta.findOne({where: {id: id}, include: [{model: Persona, include: {model: Rol}}]}).then(function (cuenta) { 
            if (cuenta) {
                var userinfo = {
                    id: cuenta.id,
                    id_cuenta: cuenta.external_id,
                    id_persona: cuenta.persona.external_id,
                    nombre: cuenta.persona.apellido + " " + cuenta.persona.nombre,
                    rol: cuenta.persona.rol.nombre
                };
                console.log(userinfo);
                done(null, userinfo);
            } else {
                done(cuenta.errors, null);
            }
        });
    });

    //registro de usuaios por passport
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email', 
            passwordField: 'clave',
            passReqToCallback:true
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            //verificar si el usuario no esta registrado
            Cuenta.findOne({ where: { correo: email }}).then(function (cuenta) {
                if (cuenta){
                    return done(null, false, {
                        message: req.flash('correo_repetido', 'El correo ya esta regisrado')
                    });
                } else {
                    var userPassword = generateHash(password);
                    Rol.findOne({ where: { nombre: 'user' }}).then(function (rol) {
                        if (rol) {
                            var dataPersona = {
                                        apellido: req.body.apellido,
                                        nombre: req.body.nombre,
                                        correo: email,
                                        cedula: req.body.cedula,
                                        telefono: req.body.telefono, 
                                        external_id: uuidv4(),
                                        id_rol: rol.id
                            };
                            Persona.create(dataPersona).then(function (newPersona, created) {
                                        if (!newPersona) {
                                            return done(null, false);
                                        }
                                        if (newPersona) {
                                            console.log("Se ha creado la persona: "+ newPersona.id);
                                            var dataCuenta = {
                                                correo: email,
                                                clave: userPassword ,
                                                id_persona: newPersona.id,
                                                external_id: uuidv4()
                                            };
                                            Cuenta.create(dataCuenta).then(function (newCuenta, created) {
                                                if(newCuenta) {
                                                    console.log("Se ha creado la cuenta: "+ newCuenta.id); 
                                                    return done(null, newCuenta);
                                                }
                                                if(!newCuenta) { 
                                                    console.log("cuenta no se pudo crear");
                                                    return done(null, false);
                                                }  
                                            });  
                                        }
                                    });
                        } else {
                            return done(null, false, {
                               // message: 'El rol no existe'
                            });
                        }
                    });
                }
            });
        }
    ));

    //inicio de sesion
    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done){
            console.log("dgfhg");
            console.log(done);
            var Cuenta = cuenta;
            var isValidPassword = function (userpass, password) { 
                return bCrypt.compareSync(password, userpass);
            }
            Cuenta.findOne({where: {correo: email}}).then(function (cuenta) {
                if (!cuenta) {
                    console.log("error");
                    return done(null, false, {message: req.flash('error',' La cuenta no existe! ')
											 }); 
                }
                if (!isValidPassword(cuenta.clave, password)) {
                    console.log("error de clave");
                    return done(null, false, {
											   message: req.flash('error',' clave Incorrecta! ')
											 });
                }
                var userinfo = cuenta.get(); 
                console.log(userinfo);
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, { message: req.flash('error',' Cuenta erronea! ') 
										 });
            });    
        }
    ));
}