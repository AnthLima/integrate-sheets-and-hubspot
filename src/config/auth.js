require('dotenv').config();

module.exports = {
    secret: process.env.SECRET_JWT,
    expireIn: "1h"
}