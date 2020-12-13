var db = require('../database/models/index.js');
const { Sequelize } = require('../database/models/index.js');
const { userInfo } = require('os');



let productsController = {


	/*raiz: (req, res) => {

		db.sequelize.query('SELECT * FROM productos')

			.then(function (resultados) {

				products = resultados[0];
				res.render('products', { products })

			})

			.catch(error => console.log(error));
	},
*/

	raiz: (req, res) => {
		db.Producto.findAll()
			.then(products => {
				//products=productos
				res.render("products", { products });
			})
			.catch(error => console.log(error));
	},



	detail: (req, res) => {
		if (req.session.user) {
			user = req.session.user
		} else {

			user = {
				categoria: null
			}

		}
		db.Producto.findByPk(req.params.id)

			.then(function (producto) {



				res.render('detail', { producto, user });

			})
			.catch(error => console.log(error));

	},



	formAlta: (req, res) => {

		let data = {
			Formulario: 'NuevoProducto',
		};
		res.render('formProducto', { data: data });

	},


	crear: (req, res, next) => {      //crear producto nuevo

		db.Producto.create({
			nombre: req.body.nombre,
			color: req.body.color,
			categoría: req.body.categorí1a,
			variedad: req.body.variedad,
			precio: parseFloat(req.body.precio),
			descuento: parseFloat(req.body.descuento),
			descripcionCorta: req.body.descripcionCorta,
			crianza: req.body.crianza,
			descripcionLarga: req.body.descripcionLarga,
			imagen: req.files[0].filename,
			característica: req.body.característica
		})

		let data = {
			Formulario: "NuevoProducto",
			mensaje: 'El producto se agregó exitosamente, puede agregar otro'
		}
		res.render("formProducto", { data: data });



	},


	edit: (req, res) => {

		db.Producto.findByPk(req.params.id)

			.then(function (producto) {
				console.log(producto)

				product = producto;

				console.log(product)
				let data = {
					Formulario: 'ModificarProducto',

				}

				res.render('formProducto', { data, product });

			})

			.catch(error => console.log(error));
	},




	update: (req, res) => {
		db.Producto.update({
			nombre: req.body.nombre,
			color: req.body.color,
			categoría: req.body.categorí1a,
			variedad: req.body.variedad,
			precio: parseFloat(req.body.precio),
			descuento: parseFloat(req.body.descuento),
			descripcionCorta: req.body.descripcionCorta,
			crianza: req.body.crianza,
			descripcionLarga: req.body.descripcionLarga,
			imagen: req.files[0].filename,
			característica: req.body.característica


		}, {

			where:
				{ id: req.params.id }
		})



		res.redirect('/products/edit/' + req.params.id);


	},

	delete: (req, res) => {
		db.Producto.findByPk(req.params.id)
			.then(function (producto) {
				product = producto;

				let data = {
					Formulario: 'DeleteProducto',

				}
				res.render('formProducto', { data, product });
			})


	},


	destroy: (req, res) => {
		// Do the magic
		db.Producto.destroy({
			where: {
				id: req.params.id
			}
		})

		res.redirect('/products/');


	},

	carrito: (req, res) => {
		user = req.session.user;
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

		user = req.session.user
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

							return res.redirect('/products/carrito/<%=user.id%>')

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

	}



}

module.exports = productsController;    
