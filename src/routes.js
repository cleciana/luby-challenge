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

// middlewares
const authMiddleware = require('./app/middlewares/auth.middleware');
const upload = multer({storage, limits: {
		fileSize: 1024*1024*3
	}
});

const routes = new Router();

// Rota raiz
routes.get('/', (req, res) => {
	res.status(404).send({message: '404: Page not found :/ '});
});

// Rotas públicas
routes.post('/login', authController.authenticate);
routes.post('/cadastro', userController.create);

// Rotas privadas (necessario estar logado)
routes.use(authMiddleware.login);

// Rotas de usuario
routes.get('/user',userController.show);
routes.put('/user', userController.update);
routes.delete('/user', userController.remove);

// Rota para upload do avatar
routes.post('/upload', upload.single('avatar'), (req, res) => {

	req.body = {
		username: req.body.username,
		avatar_url: req.file.path
	}
	console.log(req.file);
	userController.update(req, res);
});

// Rotas de Follow
routes.post('/user/follow', followController.follow);
routes.delete('/user/unfollow', followController.unfollow);
routes.get('/user/followers', followController.list);
routes.get('/user/follower/details', followController.show);

module.exports = routes;