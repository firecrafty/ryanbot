const {Command} = require('discord.js-commando');
module.exports = class KillCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kill',
            group: 'util',
            memberName: 'kill',
            description: `Kills all bot processes`,
            ownerOnly: true,
            hidden: true
        });
    }

    async run(message) {
        const sentMessage = await message.channel.send(`${message.author} => Are you sure you want to kill the bot?`);
        const white_check_react = await sentMessage.react("✅");
        const red_x = await sentMessage.react("❌");
        const collector = sentMessage.createReactionCollector((m, u) => u.id === message.author.id,
            {time: 10000});

        collector.on('collect', (m, u) => {
            if(m.emoji === white_check_react.emoji) {
                collector.stop();
                this.kill(sentMessage, message.author);
            } else if(m.emoji === red_x.emoji) {
                collector.stop();
                this.cancel(sentMessage, message.author);
            }
        });
        collector.on('end', (c, r) => {
            if(r === "time") this.timeout(sentMessage, message.author);
        });
    }
    async kill(message, user) {
        await message.clearReactions();
        await message.edit(`${user} => Killing all bot processes...`);
        await this.client.user.setStatus("invisible");
        process.exit(0);
    }
    async cancel(message, user) {
        message.clearReactions();
        message.edit(`${user} => Cancelled!`);
    }
    async timeout(message, user) {
        message.clearReactions();
        message.edit(`${user} => You didn't respond in time!`);
    }
};