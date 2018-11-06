const { ArgumentType } = require('discord.js-commando');

class SettingsOperationType extends ArgumentType {
    constructor(client) {
        super(client, 'settings_operation');
    }

    validate(val, msg, arg) {
        if(val.toLowerCase() === 'get' || val === 'set' || val === 'unset') {
            return true;
        } else {
            return false;
        }
    }

    parse(val, msg) {
        return val.toLowerCase();
    }
}
module.exports = SettingsOperationType;