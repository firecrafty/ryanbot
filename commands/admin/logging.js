const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
class LoggingCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'logging',
            group: 'admin',
            memberName: 'logging',
            description: 'Enables or disables logging',
            args: [
                {
                    key: 'operation',
                    prompt: 'Enable or disable?',
                    type: 'string',
                    oneOf: ['enable', 'disable'],
                    default: 'enable'
                },
                {
                    key: 'channel',
                    prompt: 'What channel should the logs be written to?',
                    type: 'channel',
                    default: ''
                }
            ],
            clientPermissions: ['VIEW_AUDIT_LOG',
                                'MANAGE_GUILD',
                                'MANAGE_MESSAGES',
                                'MANAGE_CHANNELS',
                                'MANAGE_ROLES'],
            userPermissions: ['ADMINISTRATOR']
        });
    }
    async run(message, {operation, channel}) {
        let reply = new RichEmbed()
            .setColor('BLUE');
        if(operation === 'enable') {
            if(channel === '') {
                return message.reply('Log channel needs to be specified to enable logging.');
            }
            if(!channel.memberPermissions(this.client.user).has('SEND_MESSAGES', true)) {
                return message.reply(`Bot must have permission to post messages in channel "${channel.name}"`);
            }
            await message.guild.settings.set("loggingEnabled", true);
            await message.guild.settings.set("loggingChannel", channel.id);
            reply.setTitle(`Logging enabled for ${message.guild.name}`)
                .setFooter('LOGGING ENABLED')
                .addField('Channel', channel);
        } else if(operation === 'disable') {
            await message.guild.settings.set('loggingEnabled', false);
            reply.setTitle(`Logging Disabled for ${message.guild.name}`)
                .setFooter('LOGGING DISABLED');
        }
        return message.channel.send(reply);
    }
}
module.exports = LoggingCommand;
