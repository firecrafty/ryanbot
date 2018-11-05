const winston = require('winston');
const colors = require('colors');
module.exports = client => {
    client.user.setPresence({
        status: 'online',
        game: {
            type: 'PLAYING',
            name: `@${client.user.username}#${client.user.discriminator} help`
        }
    });
    winston.info(`${client.user.username} is ready to serve ${client.users.size} users in ${client.guilds.size} server${client.guilds.size > 1 ? 's' : ''}`);
    winston.info('Bot ready!'.green);
};