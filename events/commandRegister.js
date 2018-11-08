const winston = require('winston');
module.exports = (client, command, registry) => {
    winston.debug(`[REGISTRATION]: Command '${command.name}' registered successfully!`);
}