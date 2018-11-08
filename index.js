const winston = require('winston');
const colors = require('colors');
winston.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp(), winston.format.cli(), winston.format.colorize())
}));
const path = require('path');
const SequelizeProvider = require('./providers/Sequelize');
const SettingsOperationType = require('./types/SettingsOperationType');
const RyanbotClient = require('./RyanbotClient');
winston.info("Starting bot!".cyan);
const client = new RyanbotClient({
    commandPrefix: process.env.BOT_PREFIX,
    owner: process.env.CREATOR_ID
});
winston.info("[REGISTRATION]: Registering functions...")
client.registerEvents().then(() => {
    client.registry
        .registerDefaults()
        .registerGroups([
            { id: 'admin', name: 'Administration'}
        ])
        .registerTypesIn(path.join(__dirname, 'types'))
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
client.setProvider(new SequelizeProvider(client.database));
winston.info("[LOGIN]: Starting log in...");
client.login(process.env.BOT_TOKEN).then(() => winston.info("[LOGIN]: Login successful!"));