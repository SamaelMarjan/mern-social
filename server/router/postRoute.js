const { createPost, getAll, getSingle, updatePost, deletePost, likePost } = require('../controllers/postController')
const { verifyToken } = require('../middleware/authMiddleware')

const router = require('express').Router()

//create post route
router.post('/create', verifyToken, createPost)

//get all post
router.get('/get', verifyToken, getAll)

//get single
router.get('/get/:id', verifyToken, getSingle)

//update post
router.put('/update/:id', verifyToken, updatePost)

//delete post
router.delete('/delete/:id', verifyToken, deletePost)

//like post route
router.put('/like', verifyToken, likePost)

//unlike post route
router.put('/unlike', verifyToken, likePost)


module.exports = router