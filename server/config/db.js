const mongoose = require('mongoose')

module.exports = async() => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Database connected')
    } catch (error) {
        console.log(error);
    }
}