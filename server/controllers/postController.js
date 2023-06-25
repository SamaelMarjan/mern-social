const postModel = require('../model/post')

//create post controller
module.exports.createPost = async(req, res) => {
    try {
        //crete post
        const post = await postModel({...req.body, createBy: req.user.id}).save()
        res.status(200).json({
            success: true, message: "Post created successfull", post
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: "Something wrong when creating post"
        })
    }
}

//get all post controller
module.exports.getAll = async(req, res) => {
    try {
        const allPost = await postModel.find().populate({path: 'createBy', select: '-password -confirmPassword'})
        res.status(200).json({
            success: true, message: "All post", allPost
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: "Something wrong when get all post"
        })
    }
}

//get single post controller
module.exports.getSingle = async(req, res) => {
    try {
        const {id} = req.params
        const singlePost = await postModel.findById(id).populate({path: 'createBy', select: '-password -confirmPassword'})
        res.status(200).json({
            success: true, message: "Single post", singlePost
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: "Something wrong when get single post"
        })
    }
}

//update post controller
module.exports.updatePost = async(req, res) => {
    try {
        const {id} = req.params
        const updatePost = await postModel.findByIdAndUpdate(id, {...req.body}, {new: true}).populate({path: 'createBy', select: '-password -confirmPassword'})
        res.status(200).json({
            success: true, message: 'Successfully updated', updatePost
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: "Something wrong when updating post"
        })
    }
}

//delete post controller
module.exports.deletePost = async(req, res) => {
    try {
        const {id} = req.params
        await postModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true, message: "Post deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: "Something wrong when deleting post"
        })
    }
}

//like
module.exports.likePost = async(req, res) => {
    try {
        await postModel.findByIdAndUpdate(req.body.id, {
            $push:{
                likes: req.user.id
            }
        }, {new: true})
        res.status(200).json({message: 'Successfully liked'})
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: "Something wrong when like post"
        })
    }
}

//unlike
module.exports.unlikePost = async(req, res) => {}
