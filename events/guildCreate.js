const winston = require('winston');
module.exports = (client, guild) => {
    winston.info(`Joined guild "${guild.name}!"`);
};