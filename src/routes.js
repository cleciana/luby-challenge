const Router = require('express');

const routes = new Router();

// Rota raiz
routes.get('/', (req, res) => {
    res.status(404).send({message: '404: Page not found :/ '});
});
// Rotas de usuario
routes.get('/user', (req, res) => {
    res.status(200).send({message:'Coisas de usuarios'});
});

module.exports = routes;