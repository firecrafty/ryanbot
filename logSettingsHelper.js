const winston = require('winston');
module.exports = {
    getLoggingChannelOfGuild: async guild => {
        let channelId = await guild.settings.get('loggingChannel');
        if(!channelId) {
            winston.error(`[EVENT LOGGING]: Logging enabled but no log channel id defined for guild ${guild.name}. Channel Id: ${channelId}`);
            return undefined;
        }
        let channel = await guild.channels.get(channelId);
        if(!channel) {
            winston.error(`[AUDIT LOGGING]: Logging enabled but log channel id invalid for guild ${guild.name}. Channel Id: ${channelId}`);
            return undefined;
        }
        return channel;
    }
};
