const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    posts: {type: String},
    image: {type: String},
    createBy: {type: mongoose.Types.ObjectId, ref: 'User'},
    likes: [{
        type: mongoose.Types.ObjectId, ref: 'User'
    }]
}, {timestamps: true})

module.exports = mongoose.model("Post", postSchema)