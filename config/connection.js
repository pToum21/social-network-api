const { connect, connection } = require('mongoose');

// sets up the mongo db connection
const connectionString =
    'mongodb://127.0.0.1:27017/socialNetworkApiDB';

connect(connectionString);

module.exports = connection;