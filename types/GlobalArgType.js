const { ArgumentType } = require('discord.js-commando');

class GlobalArgType extends ArgumentType {
    constructor(client) {
        super(client, 'global_arg');
    }
    parse(val) {
        return val === 'global';
    }

    validate() {
        return true;
    }
}
module.exports = GlobalArgType;