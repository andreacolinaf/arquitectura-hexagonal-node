const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbConnectionString = 'mongodb://127.0.0.1:27017/shopping-cart';

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

const getConnection = () => {
    return mongoose.connection;
};

const connect = () => {
    // Open Connection to Mongo DB
    return mongoose.connect(dbConnectionString, options);
};

const close = () => {
    return mongoose.connection.close();
};

module.exports = {
    getConnection,
    connect,
    close
};