const Router = require('express');

// controllers
const userController = require('./app/controllers/user.controller');
const authController = require('./app/controllers/auth.controller');
const followController = require('./app/controllers/follow.controller');
const avatarController = require('./app/controllers/avatar.controller');

// middleware
const authMiddleware = require('./app/middlewares/auth.middleware');

const routes = new Router();

// Rota raiz
routes.get('/', (req, res) => {
	res.status(404).send({message: '404: Page not found :/ '});
});

// Login
routes.post('/login', authController.authenticate);
routes.post('/user', userController.create);
routes.use(authMiddleware.login);

// Rotas de usuario
routes.get('/user',userController.show);
routes.put('/user', userController.update);
routes.delete('/user', userController.remove);

// Rota para upload do avatar
routes.post('/user/:nome/profile-pic', avatarController.save);

// Rotas de Follow
routes.post('/user/follow', followController.follow);
routes.delete('/user/unfollow', followController.unfollow);
routes.get('/user/followers', followController.list);
routes.get('/user/follower/details', followController.show);

module.exports = routes;