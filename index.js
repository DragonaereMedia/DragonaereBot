require("./modules/checkValid");

const { Client, Collection, Intents } = require('discord.js');
const { Player } = require("discord-player");

require('newrelic');

const Logger = require("./modules/Logger");
const Embeds = require("./modules/Embeds");
const Util = require("./modules/Util");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ],
  allowedMentions: { parse: ["roles", "users"], repliedUser: false }
});

client.commands = new Collection();

client.logger = Logger;
client.utils = Util;
client.say = Embeds;

client.player = new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 600000,
  autoSelfDeaf: true,
  initialVolume: 50
});

const { token } = require('./config.json');

require("./handler/EventHandler")(client);

client.login(token);