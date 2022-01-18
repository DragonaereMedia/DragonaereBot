require('dotenv').config();
const perspective = require('./perspective.js');
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

const emojiMap = {
	'FLIRTATION': '💋',
	'TOXICITY': '🧨',
	'INSULT': '👊',
	'INCOHERENT': '🤪',
	'SPAM': '🐟',
};

// Store some state about user karma.
// TODO: Migrate to a DB, like Firebase
const users = {};

async function banBaddie(user, guild) {
	const member = guild.member(user);
	if (!member) return;
	try {
		await member.ban('Too many Warnings');
	} catch (err) {
		console.log(`Could not ban user ${user.username}: ${err}`);
	}
}

async function evaluateMessage(message) {
	let scores;
	try {
		scores = await perspective.analyzeText(message.content);
	} catch (err) {
		console.log(err);
		return false;
	}

	const userid = message.author.id;

	for (const attribute in emojiMap) {
		if (scores[attribute]) {
			message.react(emojiMap[attribute]);
			users[userid][attribute] =
				users[userid][attribute] ?
				users[userid][attribute] + 1 : 1;
		}
	}
	return (users[userid]['TOXICITY'] > process.env.WARN_THRESHOLD);
}

function getKarma() {
	const scores = [];
	for (const user in users) {
		if (!Object.keys(users[user]).length) continue;
		let score = `<@${user}> - `;
		for (const attr in users[user]) {
			score += `${emojiMap[attr]} : ${users[user][attr]}\t`;
		}
		scores.push(score);
	}
	console.log(scores);
	if (!scores.length) {
		return '';
	}
	return scores.join('\n');
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

client.on('message', async (message) => {
	if (!message.guild || message.author.bot) return;
  
	const userid = message.author.id;
	if (!users[userid]) {
		users[userid] = [];
	}

	let shouldBan = false;
	try {
		shouldBan = await evaluateMessage(message);
	} catch (err) {
		console.log(err);
	}
	if (shouldBan) {
		banBaddie(message.author, message.guild);
		delete users[message.author.id];
		message.channel.send(`Banned user ${message.author.username} from channel`);
		return;
	}
	if (message.content.startsWith('!karma')) {
		const karma = getKarma(message);
		message.channel.send(karma ? karma : 'No karma yet!');
	}
});

client.login(process.env.TOKEN);