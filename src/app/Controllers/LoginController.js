const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");
const config =  require("../../config/auth");

class LoginController {
    async index(req, res) {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if(!userExist){
            res.status(400).json({
                "message": "Oops! User does not exists!"
            });
        }

        const isValidPassword =  await bcrypt.compare(password, userExist.password);

        if(!isValidPassword){
            res.status(400).json({
                "message": "Oops! Invalid password!"
            });
        }

        res.status(200).json({
            user: {
                name: userExist.name,
                email: userExist.email,
            },
            token: jwt.sign(
                
                { id: userExist._id }, 
                config.secret,
                {expiresIn: config.expireIn}
            ),
        });
    }
}

module.exports =  new LoginController();