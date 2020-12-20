const loggedUser = (req, res, next) => {      //Valida que exista un usuario logueado en la sesión
    if (req.session.user != undefined) {
        next();
    } else {
        res.redirect("/users/login");
    }
};

module.exports = loggedUser;

/*
req.session.user = usuario;
user = req.session.user

req.session.userLogged = newUser;

*/