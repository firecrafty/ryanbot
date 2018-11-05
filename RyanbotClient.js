const { CommandoClient } = require('discord.js-commando');
const Database = require('./db-init/Database');
const {promisify} = require('util');
const fs = require('fs');
const readDirAsync = promisify(fs.readdir);
const winston = require('winston');
class RyanbotClient extends CommandoClient {
    constructor(options) {
        super(options);
        this.database = Database.db;
        Database.start();
    }

    registerEvents() {
        return readDirAsync("./events/").then((files) => {
            files.forEach(file => {
                const event = require(`./events/${file}`);
                let eventName = file.split(".")[0];
                this.on(eventName, event.bind(null, this));
                winston.debug(`Event '${eventName}' registered successfully from file '${file}'!`);
            });
        }).catch((err) => {
            console.error(err);
        });
    };
}
module.exports = RyanbotClient;