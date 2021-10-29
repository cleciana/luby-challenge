const Router = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

// controllers
const userController = require('./app/controllers/user.controller');
const authController = require('./app/controllers/auth.controller');
const followController = require('./app/controllers/follow.controller');
const repositoryController = require('./app/controllers/repository.controller');
const starController = require('./app/controllers/star.controller');

// middlewares
const authMiddleware = require('./app/middlewares/auth.middleware');
const upload = multer({storage, limits: {
		fileSize: 1024*1024*3
	}
});

const routes = new Router();

// Rotas públicas
routes.get('/', (req, res) => {
	res.status(404).send({message: '404: Page not found :/ '});
});

routes.post('/login', authController.authenticate);
routes.post('/cadastro', userController.create);

// Rotas privadas (necessario estar logado)
routes.use(authMiddleware.login);

// User
routes.get('/user',userController.show);
routes.put('/user', userController.update);
routes.delete('/user', userController.remove);

// Upload do avatar
routes.post('/upload', upload.single('avatar'), (req, res) => {

	req.body = {
		username: req.body.username,
		avatar_url: req.file.path
	}
	userController.update(req, res);
});

// Follow
routes.post('/user/follow', followController.follow);
routes.delete('/user/unfollow', followController.unfollow);
routes.get('/user/followers', followController.list);
routes.get('/user/follower/details', followController.show);

// Repository
routes.post('/user/repos', repositoryController.create);
routes.get('/user/repos',repositoryController.list);
routes.put('/user/repos', repositoryController.update);
routes.delete('/user/repos', repositoryController.remove);

// Star
routes.post('/user/repos/star', starController.star);
routes.get('/user/repos/star', starController.list);
routes.delete('/user/repos/star', starController.unstar);

module.exports = routes;