const {promisify} = require('util');
const fs = require('fs');
const readDirAsync = promisify(fs.readdir);
module.exports = (client) => {
    client.registerEvents = () => {
        return readDirAsync("./events/").then((files) => {
            files.forEach(file => {
                const event = require(`./events/${file}`);
                let eventName = file.split(".")[0];
                client.on(eventName, event.bind(null, client));
                console.log(`Event '${eventName}' registered successfully from file '${file}'!`);
            });
        }).catch((err) => {
            console.error(err);
        });
    };
};


