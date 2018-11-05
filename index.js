const path = require('path');
const sqlite = require('sqlite');
const Commando = require('discord.js-commando');
const client = new Commando.Client({
    commandPrefix: '%',
    owner: process.env.CREATOR_ID
});
require("./clientFunctions.js")(client);

client.registerEvents().then(() => {
    client.registry
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, 'commands'));
});

/**
fs.readdir("./events/", (err, files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log(`Attempting to load event "${eventName}" from file ${file}`);

    });
});

client.commands-old = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands-old/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let command = require(`./commands/${file}`);
        let commandName = command.help.name || file.split(".")[0];
        console.log(`Attempting to load command "${commandName}" from file ${file}`);
        client.commands-old.set(commandName, command);
        command.conf.aliases.forEach(alias => {
            client.aliases.set(alias, commandName);
        })
    });
});
 */


/*client.setProvider(
    sqlite.open(path.join(__dirname, 'db/settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);*/

client.login(process.env.BOT_TOKEN);