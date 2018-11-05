const winston = require('winston');
module.exports = (client, group, registry) => {
    winston.debug(`Group '${group.id}' registered successfully!`);
};