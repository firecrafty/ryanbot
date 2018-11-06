const {Command} = require('discord.js-commando');

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'util',
            memberName: 'mute',
            description: 'Mutes a user',
            args: [
                {
                    key: 'user',
                    prompt: 'Who do you want to mute?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Why are muting this user?',
                    type: 'string',
                    default: ''
                }
            ],
            ownerOnly: true
        });

    }

    run(message, {user, reason}) {
        message.guild.channels.forEach((channel => {
            if (channel.type == 'text') {
                channel.overwritePermissions(user, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            }
        }));
        var mute = new Discord.RichEmbed()
            .setTitle('User was muted.')
            .addField('User', user, true)
            .addField('Muted by', message.author, true)
            .addField('Reason', reason)
            .setFooter("MUTED")
            .setTimestamp()
            .setColor([255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
        message.channel.send({
            embed: mute
        });
    }

};