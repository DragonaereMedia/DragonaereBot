const { Client, Collection, Intents } = require('discord.js');
const { Player } = require("discord-player");
const downloader = require("@discord-player/downloader").Downloader;
const express = require('express')

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

client.player.use("YOUTUBE_DL", downloader);

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'dragonaerebot',
  keyFilename: 'dragonaerebot-firebase-adminsdk-g1ing-09bedfd2c3.json',
});

require("./handler/EventHandler")(client);

client.on("guildCreate", async guild => {
  const guildId = guild.id;
  const addGuild = db.collection('guilds').doc(`${guildId}`);
  
  await addGuild.set({ 'guildId': guild.id, 'guildName': guild.name }, { merge: true });
})

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`)
})

client.login(process.env.TOKEN);