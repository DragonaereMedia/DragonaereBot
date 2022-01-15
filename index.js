require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { Manager } = require("erela.js");

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.manager = new Manager({
	nodes: [{
		host: "lava.link",
		port: 80,
		retryDelay: 5000,
	}],
	autoPlay: true,
	send: (id, payload) => {
		const guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	}
})
	.on("nodeConnect", node => console.log(`Node "${node.options.identifier}" connected.`))
	.on("nodeError", (node, error) => console.log(
		`Node "${node.options.identifier}" encountered an error: ${error.message}.`
	))
	.on("trackStart", (player, track) => {
		const channel = client.channels.cache.get(player.textChannel);
		channel.send(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`);
	})
	.on("queueEnd", player => {
		const channel = client.channels.cache.get(player.textChannel);
		channel.send("Queue has ended.");
		player.destroy();
	});


client.once('ready', () => {
	client.manager.init(client.user.id);
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on("raw", d => client.manager.updateVoiceState(d));

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

client.login(process.env.TOKEN);