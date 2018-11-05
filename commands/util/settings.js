const {Command} =  require('discord.js-commando');

module.exports = class SettingsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'settings',
            group: 'util',
            memberName: 'settings',
            description: 'sets settings',
            ownerOnly: true
        })
    }

    run(msg) {
        msg.author.send("hey");
    }
};