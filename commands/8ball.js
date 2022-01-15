const { SlashCommandBuilder } = require('@discordjs/builders');

const responses = [
	"It is certain",
	"It is decidedly so",
	"Without a doubt",
	"Yes – definitely",
	"You may rely on it",
	"As I see it",
	"yes",
	"Most Likely",
	"Outlook good",
	"Yes",
	"Signs point to yes"
];

const randomIndex = Math.floor(Math.random() * responses.length);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8')
		.setDescription('Shake the 8 ball'),
	async execute(interaction) {
		await interaction.reply(responses[randomIndex]);
	},
};