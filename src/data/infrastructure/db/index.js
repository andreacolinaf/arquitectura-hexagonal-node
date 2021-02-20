const mongoose = require('mongoose');
const schemasFactory = require('./schemas');
mongoose.Promise = require('bluebird');

module.exports = ({ dbConnectionString }) => {
    if (!dbConnectionString) {
        throw new Error('add correct format of config with dbConnectionString');
    }
    const options = {
        useMongoClient: true,
        promiseLibrary: require('bluebird'),
    };

    // Check for errors on connecting to Mongo DB
    mongoose.connection.on('error', (err) => {
        console.log(`Error! DB Connection failed. Error: ${err}`);
        return err;
    });

    // Connection opened successfully
    mongoose.connection.once('open', () => {
        console.log('Connection to MongoDB established');
        // mongoose.connection.db.dropDatabase()
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Connection to MongoDB closed');
        console.log('-------------------');
    });

    const schemas = schemasFactory.create(mongoose);
    return Object.assign(
        {
            getConnection() {
                return mongoose.connection;
            },

            connect() {
                // Open Connection to Mongo DB
                return mongoose.connect(dbConnectionString, options);
            },
            close() {
                return mongoose.connection.close();
            },
        },
        {
            schemas,
        },
    );
};