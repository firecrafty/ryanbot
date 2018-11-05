const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'util',
            memberName: 'invite',
            description: `Generates an invite link to add this bot to a server`
        });
    }
    run(message) {
        let url = `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot`;
        let embed = new RichEmbed()
            .setTitle('Invite Link')
            .setColor("AQUA")
            .setURL(url)
            .setDescription(url)
            .setAuthor(this.client.user.username)
            .setTimestamp();
        return message.channel.send(embed);
    }
};