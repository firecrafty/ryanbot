const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class TimeoutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'timeout',
            group: 'util',
            memberName: 'timeout',
            description: 'shutdown a channel',
            guildOnly: true,
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    key: 'time',
                    prompt: 'How long should the timeout last?',
                    type: 'integer'
                }
            ],
            ownerOnly: true
        });

    }
    run(message, {time}) {
        var id = message.guild.id;
        if(isNaN(time) || time < 0) return message.channel.send(new Discord.RichEmbed().setTitle("Invalid time").setDescription("Time must be a positive valid number").setColor("RANDOM"));
        if(time >= 60) {
            var minutes = Math.floor(time / 60);

            var seconds = time % 60;
            var timecode = `${minutes} minutes and ${seconds} seconds`;
        } else {
            var timecode = `${time} seconds`;
        }
        var embed = new Discord.RichEmbed();
        embed.setTitle("This channel has been timed out.")
            .addField("Length", timecode)
            .addField("Initiated by", message.author)
            .setFooter("TIMEOUT")
            .setTimestamp()
            .setColor(([255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]));
        message.channel.overwritePermissions(id, {
            SEND_MESSAGES: false
        })
            .then(
                message.channel.send({
                    embed: embed
                })
                    .then(message => {
                        setTimeout(() => {
                            var embed2 = new Discord.RichEmbed();
                            embed2.setTitle("The timeout period has elapsed.")
                                .setFooter("TIMEOUT")
                                .setTimestamp()
                                .setColor([Math.floor(Math.random() * 256), 255, Math.floor(Math.random() * 256)])
                            message.edit({
                                embed: embed2
                            });
                            message.channel.overwritePermissions(id, {
                                SEND_MESSAGES: true
                            });
                        }, time*1000);
                    })
            );
    }
}
