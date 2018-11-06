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
        let toSend = "Jackson is a bonobo"
        if(this.client.isOwner(msg.author)) {
            toSend = "<@220654054177636352> is a bonobo"
        }
        msg.delete();
        return msg.channel.send(toSend);
    }
}