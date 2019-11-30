const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.route.path === '/api/pets') {
            cb(null, './app/public/images/petsImages/');
        } else if (req.route.path === '/api/petsTypes'){
            cb(null, './app/public/images/petsTypesIcons/');
        }
    },
    filename: function (req, file, cb) {
        if (req.route.path === '/api/pets') {
            cb(null, new Date().toISOString() + '-' + file.originalname);
        } else if (req.route.path === '/api/petsTypes'){
            cb(null, req.body.type + file.originalname.match(/\.(\w)+$/)[0]);
        }
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({storage: storage, limits: {
        fileSize: 1024 * 1024 * 200
    },
    fileFilter: fileFilter
});

module.exports = {
    upload: upload
};