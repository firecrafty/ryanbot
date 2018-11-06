const {Command} =  require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class SettingsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'settings',
            group: 'util',
            memberName: 'settings',
            description: 'sets settings',
            args: [
                {
                    key: 'operation',
                    prompt: 'get or set?',
                    type: 'settings_operation',
                    default: 'get'
                },
                {
                    key: 'key',
                    prompt: 'Key of setting to get or set:',
                    type: 'string'
                },
                {
                    key: 'value',
                    prompt: 'Value of setting to set:',
                    type: 'string',
                    default: ''
                },
                {
                    key: 'global',
                    prompt: 'global?',
                    type: 'global_arg',
                    default: ''
                }
            ],
            ownerOnly: true
        });
    }

    async run(msg, {key, value, operation, global}) {
        console.log(operation);
        const settings = this.client.provider;
        let guild = msg.guild;
        if(msg.channel.type === 'dm' || global) {
            guild = 'global';
        }
        const reply = new RichEmbed()
            .setTitle('Settings')
            .setTimestamp()
            .addField('guild', guild.toString())
            .addField('key', key)
            .setColor("GREEN");
        if(operation === 'get') {
            value = await settings.get(guild, key);
            reply.addField("value", value);
        } else if(operation === 'set') {
            value = await settings.set(guild, key, value);
            reply.addField("value", value)
                .setFooter("SET SUCCESSFULLY");
        } else if(operation === 'unset') {
            await settings.remove(guild, key);
            reply.setFooter("REMOVED SUCCESSFULLY");
        }
        msg.channel.send(reply);
    }
};