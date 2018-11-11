const { RichEmbed } = require('discord.js');
const { getLoggingChannelOfGuild } = require('../logSettingsHelper');
const winston = require('winston');
module.exports = async (client, message) => {
    const guild = message.guild;
    console.log(message.content);
    const logEntry = await guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then((audit => audit.entries.last()));
    await guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then((audit => audit.entries.forEach(entry => {
        console.log(`Channel: ${logEntry.extra.channel.name}, target ${logEntry.target.username}, executor ${logEntry.executor.username}`)
    })));
    let user;
    let noLog = false;
    if (logEntry.extra.channel.id === message.channel.id
        && (logEntry.target.id === message.author.id)
        && (logEntry.createdTimestamp > (Date.now() - 5000))
        && (logEntry.extra.count >= 1)) {
        user = entry.executer;
    } else {
        noLog = true;
        user = message.author;
    }
    let scrubbedContent = message.content.replace(/[\n\r]/, " ");
    winston.debug(`[MESSAGE DELETED]: Message deleted. Message author: ${message.author.username}#${message.author.discriminator}, deleted by: ${user.username}#${user.discriminator}. Message Content: '${scrubbedContent}'`);
    //if(noLog) return;
    if(guild.settings.get("loggingEnabled", false)) {
        let channel = await getLoggingChannelOfGuild(guild);
        if(!channel) {
            return;
        }
        let reply = new RichEmbed()
            .setTitle('Message Deleted')
            .addField('Message author', message.author, true)
            .addField('Deleted by', user)
            .setTimestamp()
            .setColor('GOLD');
        channel.send(reply);

    }
};
