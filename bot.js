"use strict";
/**
 * F.L.A.M.E.S bot
 *
 * (c) 2019 Ned Palacios
 * https://github.com/nedpals/flames-bot
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const disco_js_1 = require("@nedpals/disco-js");
const spin_1 = require("./src/spin");
const dedent = require("dedent");
const flames_emojis = require("./src/emoji");
const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};
//@ts-ignore
class FlamesBot extends disco_js_1.Bot {
    constructor(client) {
        super(client);
        this.prefix = "+";
        this.flamesTest = (message, args) => __awaiter(this, void 0, void 0, function* () {
            let reactors = [];
            // Don't start if the user provided is only one or more than two!
            if (args.length !== 2) {
                message.channel.send("You must only pick two users.");
                return;
            }
            // Convert mention tags into user arrays.
            const users = this.getUsersFromMentions(...args);
            const printNames = `Users who gets FLAMES'd: ${users.map(user => `<@${user.id}>`).join(", ")}\n`;
            // This indicates that the bot recognized the message of the user.
            const startMsg = yield message.channel.send(dedent `
            ${printNames}

            Guess the outcome by reacting to this message.\n
            \:regional_indicator_f: - Friends\n
            \:regional_indicator_l: - Lovers\n
            \:regional_indicator_a: - Anger\n
            \:regional_indicator_m: - Married\n
            \:regional_indicator_e: - Enemies\n
            \:regional_indicator_s: - Soulmates\n

            You have a minute to guess!
        `);
            const computed = (() => {
                const usernames = users.map(u => u.username.toLowerCase());
                const discriminator = users.map(u => u.discriminator);
                // Results object
                let sum = 0;
                // Splits usernames into an array of characters
                const usernamesChopped = usernames.map(u => u.split(""));
                // This is where intersecting/common characters between two usernames go.
                let common = [];
                // Loops each character of the first username
                for (const letter in usernamesChopped[0]) {
                    // Checks if the character in first username is present in second username
                    if (usernamesChopped[1].includes(letter)) {
                        // If character is not present in the common array, push it.
                        if (common.indexOf(letter) === -1) {
                            common.push(letter);
                        }
                    }
                }
                // Filter usernames
                let commonCharRemoved = usernamesChopped.map(name => {
                    return name.filter(c => !common.includes(c));
                });
                // Combines the sum of two char lengths of the remaining chars in the usernames
                sum = commonCharRemoved.map(u => u.length).reduce((p, c) => p + c, 0);
                // SPIN THAT WHEEL!
                return spin_1.default(sum);
            })();
            yield delay(60000);
            // Collect people who reacted to the initial message.
            yield (() => __awaiter(this, void 0, void 0, function* () {
                startMsg.reactions
                    .filter(e => e.emoji.name === flames_emojis[computed])
                    .forEach(e => {
                    let users = e.users.array();
                    reactors.push(...users);
                });
            }))();
            // Prints the result
            yield startMsg.channel.send(dedent `
        ${printNames}

        The result is: ${flames_emojis[computed]} ${computed.toUpperCase()}!\n

        ${reactors.length !== 0 ? `
        Congratulations to those people who guessed the result:\n
        ${reactors.map(u => `<@${u.id}>`).join("\n")}
        ` : ''}
        `);
        });
        this.flames = (message, args) => {
            // Send help on how to use
            if (["help", "?"].includes(args[0])) {
                message.channel.send(dedent `
            **🔥 Welcome to the F.L.A.M.E.S Bot! 🔥**\n
            __**What does it do?**__\n
            It predicts the romantic chemistry/relationship between the names of the two people by\nremoving the common letters and computes the remaining ones.\n
            \n
            Usage: \`+flames @username1#1234 @username2#2345\`
        `);
            }
            else {
                this.flamesTest(message, args);
            }
        };
        this.commands = {
            'flames': this.flames
        };
    }
    ready() {
        console.log("Hello!");
    }
    getUsersFromMentions(...mentions) {
        if (!mentions)
            return;
        return mentions.map(mention => {
            if (mention.startsWith("<@") && mention.endsWith(">")) {
                mention = mention.slice(2, -1);
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                return this.client.users.get(mention);
            }
        });
    }
}
module.exports = FlamesBot;
