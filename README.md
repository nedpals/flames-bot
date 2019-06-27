<h1 align="center">🔥 The F.L.A.M.E.S Bot 🔥</h1>
<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://twitter.com/npned">
    <img alt="Twitter: npned" src="https://img.shields.io/twitter/follow/npned.svg?style=social" target="_blank" />
  </a>
</p>

> Let this Discord bot predict the romantic chemistry/relationship with other Discord users that you like. <br /> An entry for the [Discord Hack Week](https://blog.discordapp.com/discord-community-hack-week-build-and-create-alongside-us-6b2a7b7bba33).

## Install

```sh
npm install
```

**If you are going to use the bot in your dev machine, please create a `.env` file first before you start using it.**
```env
// .env
DISCORD_TOKEN=<discord token here>
```

## Usage

```sh
npm run start # for production
npm run start-dev # for development
```

### Reaction Support
Once a user will commence the test, a message will appear and from there you can react which of the following will be the outcome of that test out of all the possible outcomes.
```
🇫 - Friends
🇱 - Lovers
🇦 - Anger
🇲 - Married
🇪 - Enemies
🇸 - Soulmates
```
Whoever predicted the outcome correctly will be printed in the results.

### What does it do?
It crosses out the common letters found between those two usernames and sums up the length of the remaining letters. After that, the bot will count the number (from zero to the summed up number) against the acronym:
```
F - Friends
L - Lovers
A - Anger
M - Married
E - Enemies
S - Soulmates
```
The last letter between those 5 letters that is gonna hit by the last number is the bot's prediction of your relationship with the person.

## Author

👤 **Ned Palacios**

* Twitter: [@npned](https://twitter.com/npned)
* Github: [@nedpals](https://github.com/nedpals)

## Related
- [Disco](https://github.com/nedpals/disco) Create Discord bots fast. This is what powers the F.L.A.M.E.S bot.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/nedpals/flames-bot/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Ned Palacios](https://github.com/nedpals).<br />
This project is [MIT](LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_