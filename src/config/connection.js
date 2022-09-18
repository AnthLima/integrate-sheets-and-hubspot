const mongoose = require('mongoose');
require('dotenv').config();

class Connection {
    constructor(){
        this.connectionMongoDB();
    }

    connectionMongoDB(){
        const URL_MONGO =  process.env.URL_MONGO;   
        const mongoose = require('mongoose');
        
        async function main() {
            mongoose.connect(
                URL_MONGO,
                { useNewUrlParser: true, useUnifiedTopology: true }
            );
        }
        main() 
        .then(() => console.log('success connection in mongodb'))
        .catch(err => console.log(err));
    }
}

module.exports = new Connection();