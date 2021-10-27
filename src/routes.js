const Router = require('express');

// controllers
const userController = require('./app/controllers/user.controller');
const authController = require('./app/controllers/auth.controller');
// middleware
const authMiddleware = require('./app/middlewares/auth.middleware');
const routes = new Router();

// Rota raiz
routes.get('/', (req, res) => {
	res.status(404).send({message: '404: Page not found :/ '});
});

// Login
routes.post('/login', authController.authenticate);
routes.use(authMiddleware.login);

// Rotas de usuario
routes.get('/user',userController.show);
routes.post('/user', userController.create);
routes.put('/user', userController.update);
routes.delete('/user', userController.remove);

module.exports = routes;