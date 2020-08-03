const Comment = require('../models/comment');
class Comments {
    async create (req, res){
        const comment = new Comment({
            user:req.user._id,
            postId:req.params.id,
            content: req.body.content
        });
        try {
            const createdComment = await comment.save();
            await createdComment
                .populate('user', ['avatar', 'username'])
                .execPopulate();
            res.status(201).json(createdComment);
        } catch(err){
            res.status(400).json(err);
        }
    }
    async getAll(req, res){
        try{
            const comments = await Comment
                .find({postId:req.params.id})
                .populate('user',['avatar', 'username']);
            res.json(comments);
        } catch (err) {
            res.sendStatus(500)
        }
        res.json(comments);
    }
}
module.exports = new Comments();