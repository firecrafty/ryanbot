const { Command } = require('discord.js-commando');
module.exports = class RandomCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            group: 'util',
            memberName: 'random',
            aliases: ['rndm', 'rando', 'randos', 'rand'],
            description: 'Generates a random integer with user provided limits',
            args: [
                {
                    key: 'min',
                    prompt: 'What is the lower limit for the randomly generated number(s)?',
                    type: 'integer',
                    default: 0
                },
                {
                    key: 'max',
                    prompt: 'What is the upper limit for the randomly generated number(s)?',
                    type: 'integer',
                    default: 10,
                },
                {
                    key: 'quantity',
                    prompt: 'How many numbers do you want generated?',
                    type: 'integer',
                    min: 1,
                    max: 50,
                    default: 1
                }
            ]
        });
    }
    async run(message, {min, max, quantity}) {
        if(min > min) {
            return message.reply("The max must be larger than the min!");
        }
        const randomNumberFunction = this.getRandomArbitraryFunction(min, max);
        if(quantity === 1) {
            return message.reply(`Random number: \`${randomNumberFunction()}\``);
        }
        let toReply = "[";
        for (let i = 0; i < quantity - 1; i++) {
            toReply += randomNumberFunction() + ", ";
        }
        toReply += randomNumberFunction() + "]";
        return message.reply(`Random numbers: \`${toReply}\``);


    }
    getRandomArbitraryFunction(min, max) {
        return () => Math.floor(Math.random() * (max - min) + min);
    }
};