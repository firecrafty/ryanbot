const winston = require('winston');
module.exports = (client, type, registry) => {
    winston.debug(`[REGISTRATION]: Argument type '${type.id}' registered successfully!`);
}