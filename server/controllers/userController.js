const { hashPass, comparePass } = require('../helpers/authHelpers')
const userModel = require('../model/user')

// create user controller
module.exports.createUser = async(req, res) => {
    try {
        const {userName, firstName, lastName, email, password, confirmPassword} = req.body
        
        //validation
        if(!userName) return res.json({message: "User Name Required"})
        if(!firstName) return res.json({message: "Firstname Required"})
        if(!lastName) return res.json({message: "Lastname required"})
        if(!email) return res.json({message: "Email required"})
        if(!password) return res.json({message: "Password required"})
        if(confirmPassword !== password) return res.json({message: "Confirm passwoed and password should be matched"})

        //check already registered user
        const oldUser = await userModel.findOne({email})
        if(oldUser) return res.json({message: "Email already registered"})

        //hash password
        const hash = await hashPass(password, confirmPassword)

        //create user
        const user = await userModel({...req.body, password: hash, confirmPassword: hash}).save()
        res.status(200).json({
            success: true, message: "User created successfully", user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something went wrong when register'
        })
    }
}

// login user controller
module.exports.loginUser = async(req, res) => {
    try {
        const {email, password} = req.body

        //validations
        if(!email, !password) return res.json({message: "Email or Password required"})

        //check user
        const user = await userModel.findOne({email})
        if(!user) return res.json({message: "Invalid email"})

        //compare password
        const compare = await comparePass(password, user.password)
        if(!compare) return res.json({message: "Invalid password"})
        
        //remove password
        user.password = undefined;
        user.confirmPassword = undefined;

        res.status(200).json({
            success: true, message: "Login successfull", user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something went wrong when login'
        })
    }
}

// forgot user controller
module.exports.forgotController = async(req, res) => {
    try {
        const {email, password, confirmPassword} = req.body

        //validations
        if(!email) return res.json({message: "Email is required"})
        if(confirmPassword !== password) return res.json({message: "Password and confirm password nedd matched"})

        //check user
        const user = await userModel.findOne({email})
        if(!user) return res.json({message: 'Need valid email'})

        //hash password
        const hash = await hashPass(password, confirmPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hash, confirmPassword: hash})
        
        //remove password
        user.password = undefined;
        user.confirmPassword = undefined;
        
        res.status(200).json({
            success: true, message: "Password reset successfull", user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something went wrong when reset password'
        })
    }
}

// update password controller
module.exports.updatePasswordController = async(req, res) => {}

// get all user
module.exports.allUser = async(req, res) => {
    try {
        const user = await userModel.find()
        res.status(200).json({
            success: true, message: "All users", user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: "Something went wrong getting all user"
        })
    }
}