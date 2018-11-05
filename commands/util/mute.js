const { Command } = require('discord.js-commando');

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'util',
            memberName: 'mute',
            description: 'Mutes a user',
            args: [
                {
                    key: 'users',
                    prompt: 'Who do you want to mute?',
                    type: 'user|member'
                },
                {
                    key: 'reason',
                    prompt: 'Why are muting this user?',
                    type: 'string',
                    default: ''
                }
            ],
            ownerOnly: true
        });

    }

    run(message, {users, reason}) {

    }

};