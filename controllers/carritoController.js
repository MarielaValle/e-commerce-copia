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
               /*-------------------------*/
               let total= 0
               let cantidadProductos=0
               userCart.forEach(function(elem){
               let productoCarrito=[];
             
               productoCarrito.push(elem)  
               
              
               productoCarrito.map(function(item){
                
                 
                 let subtotal= (item.cantidad*item.precio_venta)
                   
                 total= total +subtotal
                 
                 let subtotalProductos = item.cantidad  
                 cantidadProductos=cantidadProductos + subtotalProductos                 
                 })
             
               
                 })


            return res.render('carrito', { userCart , total, cantidadProductos})
        })
        .catch(error => console.log(error)) 
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
                    imagen: producto.imagen,
                    stock:producto.stock,
                    cantidad:1
                    
                    
                    
                };
                
                db.Carrito.create(Item)
                .then(function (Item) {



                    /*--------------------------------*/

                  


                    /*-----------------------------------*/
                    
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
    sumItem: (req,res) =>{
        
         
            db.Carrito.update({
                
                cantidad:req.body.cantidad,
               
                
            },{
                where:
                { id : req.params.id}
                
            })
            
            return res.redirect('/carrito')
        
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