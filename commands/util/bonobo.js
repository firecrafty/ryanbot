const {Command} = require('discord.js-commando');

module.exports = class BonoboCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bonobo',
            group: 'util',
            memberName: 'bonobo',
            description: 'Calls Jackson a bonobo',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 600
            }
        })
    }
    run(msg) {
        return msg.channel.send("<@220654054177636352> is a bonobo");
    }
}