const multer = require('multer');

const record = multer({
    dest: 'uploads/'
});

const upload = async (req, res) => {
    record.single('avatar')
    console.log(req.file);
}

module.exports = {
    upload
}