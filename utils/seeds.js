const connection = require('../config/connection')
const { User } = require('../models');
const users = require('./data')

connection.once('open', async () => {
    console.log('connection complete!')

    let checkUser = await connection.db.listCollections({ name: 'users' }).toArray();

    if (checkUser) {
        await connection.dropCollection('users');
    }

    await User.collection.insertMany(users);

    console.table(users);
    console.info('seeding completed!!');
    process.exit(0);
})