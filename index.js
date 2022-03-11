require('dotenv').config();
const { Constants, Client, Collection, Intents, Util } = require('discord.js');
const { Azuma } = require('azuma');
const { join } = require('path');
const perspective = require('./perspective.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const MusicClient = require('./commands/music/index.js');
const { GUILDS, GUILD_MEMBERS, GUILD_BANS, GUILD_VOICE_STATES, GUILD_MESSAGES, GUILD_MESSAGE_REACTIONS } = Intents.FLAGS;
const { token } = require('./config.json');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction)
		console.log(`${interaction.user.tag} ran a command.`);

	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

const customClientOptions = {
    disableMentions: 'everyone',
    restRequestTimeout: 30000,
    intents: [ GUILDS, GUILD_MEMBERS, GUILD_BANS, GUILD_VOICE_STATES, GUILD_MESSAGES, GUILD_MESSAGE_REACTIONS ]
};

const sharderOptions = {
    clientOptions: Util.mergeDefault(Constants.DefaultOptions, customClientOptions),
    client: MusicClient,
    timeout: 90000,
    token
};

const ratelimitOptions = {
    handlerSweepInterval: 2 * 6000,
    hashInactiveTimeout: 4 * 6000,
    requestOffset: 500
};

const azuma = new Azuma(join(__dirname, '/commands/music/MusicBaseCluster.js'), sharderOptions, ratelimitOptions);

azuma
    .spawn()
    .catch(console.error);