module.exports = (client, message) => {
    //Ignore bots
    if(message.author.bot) return;

    if (message.isMentioned(client.user) && !message.command) {
        message.channel.send(`Hello! My name is ${client.user}! My prefix in this server is \`${message.guild.commandPrefix}\`, so type \`${message.guild.commandPrefix}help\` to get help!`);
    }

};
