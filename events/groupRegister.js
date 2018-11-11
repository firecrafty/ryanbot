const winston = require('winston');
module.exports = (client, group, registry) => {
    winston.debug(`[REGISTRATION]: Group '${group.id}' registered successfully!`);
};