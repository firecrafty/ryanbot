module.exports = (client, message) => {
    if(message.author.bot) return;
    if (message.isMentioned(client.user) && !message) {
        //message.channel.send(`Hello! My name is ${client.user}! My prefix in this server is \`${message.guild.commandPrefix}\`, so type \`${message.guild.commandPrefix}help\` to get help!`);
    }
    if(message.channel.type !== 'dm') {
        if(client.provider.get(message.guild, "dadJokesEnabled", false)) {
            let trimmedMessage = message.content.toLowerCase().replace(/\s{2,}/, " ").replace(/['"`“‘”’;]/, "");
            if(trimmedMessage.startsWith('im') || trimmedMessage.startsWith('i am')) {
                let mIndex = message.content.indexOf('m');
                message.channel.send(`Hi ${message.content.substring(mIndex + 1, message.content.length).trimLeft()}, I'm ${client.user.username}!`);
            }
        }
    }
};
