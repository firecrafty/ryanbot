module.exports = (client, message) => {
    if(message.author.bot) return;
    if (message.isMentioned(client.user) && !message) {
        //message.channel.send(`Hello! My name is ${client.user}! My prefix in this server is \`${message.guild.commandPrefix}\`, so type \`${message.guild.commandPrefix}help\` to get help!`);
    }

};
