const winston = require('winston');
module.exports = (client, type, registry) => {
    winston.debug(`Argument type '${type.id}' registered successfully!`);
}