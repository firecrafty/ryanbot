const winston = require('winston');
module.exports = (client, command, registry) => {
    winston.debug(`Command '${command.name}' registered successfully!`);
}