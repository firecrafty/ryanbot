module.exports = (client, message) => {
    //Ignore bots
    if(message.author.bot) return;
    if(message.author.id === client.user.id) return;
    if (message.isMentioned(client.user) && !message) {
        //message.channel.send(`Hello! My name is ${client.user}! My prefix in this server is \`${message.guild.commandPrefix}\`, so type \`${message.guild.commandPrefix}help\` to get help!`);
    }

};
