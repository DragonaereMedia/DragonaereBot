const { SlashCommandBuilder } = require('@discordjs/builders');

function flipACoin(){
	let result = Math.floor(Math.random() * 2);
	if (result === 0) {
		return('Head!');
	} else if(result === 1) {
		return('Tails!');
	} else {
		return('An Error Occured');
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a Coin!'),
	async execute(interaction) {
		await interaction.reply(flipACoin());
	},
};