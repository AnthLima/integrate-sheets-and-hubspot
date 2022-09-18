const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../../config/auth');

module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;

    if(!auth){
        res.status(401).json({
            "code": 130,
            "message": "Oops! Authentication failed!"
        });
    }

    const [, token] = auth.split(" ");

    try{
        const isDecoded = await promisify(jwt.verify)(token, config.secret);
        if(!isDecoded){
            res.status(401).json({
                "code": 130,
                "message":"Oops! Token expired!"
            });
        }else{
            req.user_id = isDecoded.id
            next();
        }
    }catch(err){
       res.status(401).json({
            "code": 130,
            "message": "Oops! Invalid token!"
       });
    }
   
}