const Router = require('express');

// controllers
const userController = require('./app/controllers/user.controller');

const routes = new Router();

// Rota raiz
routes.get('/', (req, res) => {
	res.status(404).send({message: '404: Page not found :/ '});
});

// Rotas de usuario
routes.get('/user', userController.show);
routes.post('/user', userController.create);
routes.put('/user', userController.update);
routes.delete('/user', userController.remove);

module.exports = routes;