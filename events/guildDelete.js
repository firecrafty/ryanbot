const winston = require('winston');
module.exports = (client, guild) => {
    winston.info(`Left guild "${guild.name}".`);
};