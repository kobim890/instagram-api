const express = require('express');
const users = require('../controllers/users');
const posts = require('../controllers/posts');
const comments = require('../controllers/comments')
const auth = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/posts')
    },
    filename: function (req, file, cb) {
        const nameArr = file.originalname.split('.');
        const extension = nameArr[nameArr.length - 1];
        let filename = Math.random().toString(36).substr(2,9) ;
        cb(null, filename + '.' +  extension)
    }
});

const upload = multer({ storage: storage });
const routes = express.Router();

routes.get('/users', users.getAll);
routes.put('/users', users.create);
routes.post('/users/login', users.login);
routes.get('/users/me', auth, users.me);
routes.get('/users/:id', users.getUser);
routes.get('/users/:id/posts', users.getPosts);
routes.put('/users/:id/follow');
routes.delete('/users/:id/unfollow');


routes.put('/posts', auth, upload.single('image'), posts.create);
routes.get('/posts', auth, posts.getAll);
routes.get('/posts/:id', auth, posts.getPost);
routes.put('/posts/:id/comment', auth, comments.create);
routes.get('/posts/:id/comment', auth,  comments.getAll);





routes.get('/health',(req,res)=>{
    res.send();
});

module.exports = routes;