const {Command} = require('discord.js-commando');

module.exports = class UptimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            group: 'util',
            memberName: 'uptime',
            description: 'Gets the amount of time the bot has been running'
        })
    }
    run(msg) {
        let totalSeconds = (this.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return msg.reply(`${this.client.user.username} has been running for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
    }
}