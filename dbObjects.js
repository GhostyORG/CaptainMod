const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: './database.sqlite',
});

const Users = require('./models/users.js')(sequelize, Sequelize.DataTypes);
const Guilds = require('./models/guilds.js')(sequelize, Sequelize.DataTypes);


module.exports = { Users, Guilds, Backups };