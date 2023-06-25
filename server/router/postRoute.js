const { createPost, getAll, getSingle, updatePost, deletePost, likePost, unlikePost } = require('../controllers/postController')
const { verifyToken } = require('../middleware/authMiddleware')
const multer = require('multer')
const router = require('express').Router()

//img storage path
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `image-${file.originalname}`)
    }
})

//img filter
const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('Only image is allowed'))
    }
}

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})

//create post route
router.post('/create', upload.single('image'), verifyToken, createPost)

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
router.put('/unlike', verifyToken, unlikePost)


module.exports = router