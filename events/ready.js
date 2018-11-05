var colors = require('colors');
module.exports = client => {
    console.log(`${client.user.username} is ready to serve ${client.users.size} users in ${client.guilds.size} server${client.guilds.size > 1 ? 's' : ''}`);
    console.log('Bot ready!'.green);
};