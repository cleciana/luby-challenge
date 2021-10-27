const {User} = require('../models/');

const create = async (req, res) => {
    try {
        const {nome, email, localizacao, avatar_url, username, bio} = req.body;

        const user = await User.create({
            nome, email, localizacao, avatar_url, username, bio
        });

        return res.json(user);
    } catch (error) {
        return res.json({message:`an error ocurred: ${error.message}`});
    }
}
const list = async (req, res) => {
    try {
        const users = await User.findAll();

        return res.json(users);
    } catch (error) {
        return res.json({message:`an error ocurred: ${error.message}`});
    }    
}

module.exports = {
    create,
    list,
}