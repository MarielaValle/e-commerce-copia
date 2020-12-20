var db = require('../database/models/index.js');
const { Sequelize } = require('../database/models/index.js');


const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');


let usersController = {


    loginForm: (req, res) => {
        let data = {
            Formulario: "UsuarioRegistrado",
            User: 'null'

        };
        res.render("usuarios", { data: data });

    },


    login: (req, res) => {


        db.Usuario.findOne({
            where: {
                email: req.body.email,

            }
        })
            .then(function (usuario) {

                if (usuario != null) {

                    let validación = bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia);

                    if (validación == true) {

                        req.session.user = usuario;
                       user = req.session.user

                        res.cookie('userCookie', user.id, { maxAge: 70000 * 120 })
                        res.redirect("/users/profile");

                    } else {

                        let data = { Formulario: "UsuarioRegistrado" };

                        res.render("usuarios", { data: data, errores: [{ msg: 'Credenciales inválidas' }] });

                    }

                } else {

                    let data = { Formulario: "UsuarioRegistrado" };

                    res.render("usuarios", { data: data, errores: [{ msg: 'Usuario no registrado' }] });


                }


                // res.send('estas logueado ' + req.session.user.email


            })
            .catch(error => console.log(error));



    },

    registroAdmin:(req, res) => {

        let data = {
            Formulario: 'RegistroAdmin',
            
        }

        res.render('formsUser', { data: data });


    },
    registroForm: (req, res) => {
        let data = {
            Formulario: "FormularioRegistro",
        };

        res.render("usuarios", { data: data });


    },

    

    // funcion para realizar el registro de nuevo ususario
    registrarse: (req, res) => {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            let usuarioExistente;
            let contraseniaAcargar;

            if (req.body.contrasenia == req.body.contrasenia2) {

                contraseniaAcargar = bcrypt.hashSync(req.body.contrasenia, 10);

            } else {
                let data = { Formulario: 'FormularioRegistro' };
                res.render("usuarios", { data: data, errores: [{ msg: 'Las contraseñas no coinciden' }] });

            }

            db.Usuario.findOne({
                where: {
                    email: req.body.email,

                }
            })
                .then(function (usuario) {
                    usuarioExistente = usuario


                    if (usuarioExistente == null) {

                        let imagenAcargar;
                        if (typeof req.file === 'undefined') {
                            imagenAcargar = 'avatar3.png';
                        } else {
                            imagenAcargar = req.file.filename; // se toma el nombre del archivo
                        }

                        let categoriaAcargar;
                        if (typeof req.body.categoria === 'undefined') {
                            categoriaAcargar = 'cliente';
                        } else {
                            categoriaAcargar = req.body.categoria; // se toma el nombre del archivo
                        }

                        db.Usuario.create({
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            email: req.body.email,
                            contrasenia: contraseniaAcargar,
                            categoria: categoriaAcargar,
                            imagen: imagenAcargar
                        });


                    let data = {
                            Formulario: "UsuarioRegistrado",
                            mensaje: 'Se registró correctamente por favor ingrese para loguearse'
                        }
                        res.render("usuarios", { data: data });    


                    } else {
                        let data = { Formulario: 'FormularioRegistro' };
                        res.render("usuarios", { data: data, errores: [{ msg: 'El email ya existe' }] });


                    }

                })
                .catch(error => console.log(error));

        } else {

            let data = { Formulario: 'FormularioRegistro' };

            res.render("usuarios", { data: data, errores: errores.errors });
        }
    },


    profile: (req, res) => {

        if (req.session.user) {

            db.Usuario.findOne({
                where: {
                    email: req.session.user.email

                }
            })
                .then(function (usuario) {


                    if (usuario != null) {
                        let data = {
                            Formulario: "MisDatos",
                            User: usuario,
                        };
                        res.render("usuarios", { data: data });

                    } else {

                        data = {
                            mensaje: 'usuario no encontrado'
                        }
                        res.redirect("/users/login", { data });
                    }

                })
                .catch(error => console.log(error));
        }
    },


    logout: (req, res) => {
        user = undefined;
        req.session.user = user;


        let data = {
            Formulario: "UsuarioRegistrado",
            mensaje: 'Se cerró la sesión exitosamente'
        }
        res.render("usuarios", { data: data });


    },

    edit: (req, res) => {
        if (req.session.user) {

            db.Usuario.findByPk(req.params.id)

                .then(function (usuario) {


                    let data = {
                        Formulario: 'ModificarUsuario',
                        User: usuario
                    }

                    res.render('formsUser', { data: data });

                })

                .catch(error => console.log(error));
        }
    },

    update: (req, res) => {

        let errores = validationResult(req);
        if (errores.isEmpty()) {  

        let user=req.session.user;    
        

        let contraseniaAcargar;

            if (req.body.contrasenia == req.body.contrasenia2) {

                contraseniaAcargar = bcrypt.hashSync(req.body.contrasenia, 10);

            } else {
                let data = { 
                    Formulario: 'ModificarUsuario',
                     User:user
                };
                res.render("formsUsers", { data: data, errores: [{ msg: 'Las contraseñas no coinciden' }] });

            }

        db.Usuario.update({
           
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasenia: contraseniaAcargar,
            categoria: req.body.categoria,
            imagen: req.body.imagen
        },
            {

                where:
                    { id: req.params.id }



            })
        
          
           let data = {
            Formulario: 'ModificarUsuario',
            User: user,
             mensaje: 'Su perfil se actualizó correctamente por favor ir a su perfil para ver los cambios'
        }

        res.render('formsUser', { data: data });
           


        }

        else {

            let data = { 
                Formulario: 'ModificarUsuario',
                 User:req.params.id
            };

            res.render("formsUser", { data: data, errores: errores.errors });
        }

	},


    delete: (req, res) => {
        if (req.session.user) {
            db.Usuario.findByPk(req.params.id)
                .then(function (usuario) {
                    let data = {
                        Formulario: 'DeleteUsuario',
                        User: usuario
                    }
                    res.render('formsUser', { data, data });
                })

                .catch(error => console.log(error));
            }
        },

        destroy: (req, res) => {
            // Do the magic

            user = undefined;
             req.session.user = user;

            db.Usuario.destroy({
                where: {
                    id: req.params.id
                }
                
            })
    
            res.redirect('/');
    
    
        }

};

module.exports = usersController;    