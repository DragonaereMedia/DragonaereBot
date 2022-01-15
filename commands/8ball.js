const { SlashCommandBuilder } = require('@discordjs/builders');

function doMagic8Ball() {
	var rand = ["It is certain", "It is decidedly so", "Without a doubt", "Yes – definitely", "You may rely on it", "As I see it", "yes", "Most Likely", "Outlook good", "Yes", "Signs point to yes", "no", "No"];
	return rand[Math.floor(Math.random() * rand.length)];
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Shake the 8 ball')
		.addStringOption(query =>
			query.setName('query')
				.setDescription('what question do you want answered')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply(doMagic8Ball());
	},
};