const mongoose = require('mongoose');
require('dotenv').config();

class Connection {
    constructor(){
        this.connectionMongoDB();
    }

    async connectionMongoDB(){
        const url = process.env.URL_MONGO;
        const connectionParams={
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
        await mongoose.connect(url,connectionParams)
            .then( () => {
                console.log('Connected to the database ')
            })
            .catch( (err) => {
                console.error(`Error connecting to the database. ${err}`);
            })
    }
}

module.exports = new Connection();