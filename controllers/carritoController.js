var db = require('../database/models/index.js');
const { Sequelize } = require('../database/models/index.js');
const { userInfo } = require('os');


let carritoController = {

  
raiz: (req, res) => {
    
    if (typeof user != 'undefined') {


        db.Carrito.findAll({

            where: {
                id_usuario: user.id
            },
            include: ['Producto', 'Usuario']

        })
            .then(function (userCart) {
                console.log(userCart)
                return res.render('carrito', { userCart })
            })




            .catch(error => console.log(error));

    }


    else {
        let data = {
            Formulario: "UsuarioRegistrado",
            mensaje: 'Debe loguearse para comprar y/o registrarse antes'

        };

        res.render("usuarios", { data: data });
    }
},




carritoAdd: (req, res) => {

  
    if (typeof user != 'undefined') {

        db.Producto.findByPk(req.params.id)
            .then(function (producto) {

                let Item = {

                    id_usuario: user.id,
                    id_producto: producto.id,
                    nombre_vino: producto.nombre,
                    precio_venta: producto.precio,
                    imagen: producto.imagen

                };

                db.Carrito.create(Item)
                    .then(function (Item) {

                        return res.redirect('/carrito')

                    })

            })
            .catch(error => console.log(error));

    } else {
        let data = {
            Formulario: "UsuarioRegistrado",
            mensaje: 'Debe loguearse para comprar y/o registrarse antes'

        };

        res.render("usuarios", { data: data });
    }

},



itemDelete: (req, res) => {
    
    db.Carrito.destroy({
        where: {
           id: req.params.id,
            
        }
    })
    

        return res.redirect('/carrito')

    
}


}

module.exports=carritoController;