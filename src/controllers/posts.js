const Post = require('../models/post');
class Posts {

    async create (req, res){
        const post = new Post({
            user: req.user._id,
            image: req.file.filename,
            description: req.body.description
        });

        try {
            const createdPost = await post.save();
            res.status(201).json(createdPost);
        } catch(err){
            res.status(400).json(err);
        }
    }

    async getAll(req, res){
        try{
            const posts = await Post.find()
                .populate('user',['avatar', 'username'])
                .sort({createdAt:req.query.sort});
            res.json(posts);
        } catch (err) {
            res.sendStatus(400)
        }
        res.json(posts);
    }
    async getPost(req,res){
        try{
            const post = await Post
                .findById(req.params.id)
                .populate('user', ['avatar', 'username']);
            if(!post){
                res.sendStatus(404);
                return;
            }
            res.json(post);
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = new Posts();