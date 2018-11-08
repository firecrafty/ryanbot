const winston = require('winston');
const {RichEmbed} = require('discord.js');
const {getLoggingChannelOfGuild} = require('../logSettingsHelper');
module.exports = async (client, guildBefore, guildAfter) => {
    let channel = await getLoggingChannelOfGuild(guildAfter);
    if (!channel) {
        return;
    }
    if (client.provider.get(guildAfter, "loggingEnabled", false)) {
        let embed = new RichEmbed()
            .setTitle(`Guild Updated - ${guildAfter.name}`)
            .setColor('GOLD')
            .setFooter("GUILD UPDATED");
        const logEntry = await guildAfter.fetchAuditLogs({type: 'GUILD_UPDATE'})
            .then(audit => audit.entries.first()).catch();
        let keyString = "";
        let oldString = "";
        let newString = "";
        logEntry.changes.forEach(change => {
            keyString += change.key + '\n';
            oldString += change.old + '\n';
            newString += change.new + '\n';
        });
        embed.addField("Updated by", logEntry.executor);
        embed.addField("Change", keyString, true);
        embed.addField("Old value", oldString, true);
        embed.addField("New value", newString, true);
        embed.setTimestamp(logEntry.createdAt);
        channel.send(embed);
    }
};
