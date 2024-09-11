const bcrypt = require('bcrypt')
const userDbModel = require('../models/user')
const userModel = new userDbModel();

class userController {

    async register(req, res){
        
        const userExists = await userModel.findOne(req.body.username)
        if(userExists) {
            return res.status(400).json({message: 'Username already exists'});
        }

        const passwordLength = await req.body.password.length
        if(passwordLength <= 8){
            return res.status(400).json({message: 'Password has to be longer than 8 characters'});
        }

        const cryptPassword = bcrypt.hash(req.body.password, 10)

        const registeredId = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword
            })
            if(registeredId){
                const userData = await userModel.findById(registeredId)
                req.session.user = {
                    username: userData.username,
                    user_id: userData.id
                }
                res.json({
                    message: 'New user is registered',
                    user_session: req.session.user
                })
            }
        
    }
}

module.exports = userController;