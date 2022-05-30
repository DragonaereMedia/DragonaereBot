require("./modules/checkValid");

const { Client, Collection, Intents } = require('discord.js');
const { Player } = require("discord-player");

const mongoose = require("mongoose");

// require('newrelic');

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

const { token, mongodbUrl } = require('./config.json');

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.on("ready", async () => {
  console.log("Fetching members...");
  for (const [id, guild] of client.guilds.cache) {
    await guild.members.fetch();
  }
  console.log("Fetched members.");

  console.log(
    `Bot is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`,
  );

  Dashboard(client);
});

require("./handler/EventHandler")(client);

client.login(token);