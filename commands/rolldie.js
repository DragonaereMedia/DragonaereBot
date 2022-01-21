const { SlashCommandBuilder } = require('@discordjs/builders');

function rollDice(x) {
	let result = (Math.floor(Math.random * x)).toString();
	return result;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolldie')
		.setDescription('Roll a die with a size of your choice! (4, 6, 8, 10, 12, 20)')
		.addSubcommand(subcommand =>
			subcommand
				.setName('4')
				.setDescription('Roll a 4 Sided Die!'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('6')
				.setDescription('Roll a 6 Sided Die!'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('8')
				.setDescription('Roll a 8 Sided Die!'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('10')
				.setDescription('Roll a 10 Sided Die!'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('12')
				.setDescription('Roll a 12 Sided Die!'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('20')
				.setDescription('Roll a 20 Sided Die!')),
	async execute(interaction){
		if (interaction.commandName === 'rolldie') {
			if (interaction.options.getSubcommand() === '4'){
				await interaction.reply((Math.floor(Math.random * 4)).toString())
			} else if (interaction.options.getSubcommand() === '6'){
				await interaction.reply(rollDice(6).toString())
			} else if (interaction.options.getSubcommand() === '8'){
				await interaction.reply(rollDice(8))
			} else if (interaction.options.getSubcommand() === '10'){
				await interaction.reply(rollDice(10))
			} else if (interaction.options.getSubcommand() === '12'){
				await interaction.reply(rollDice(12))
			} else if (interaction.options.getSubcommand() === '20'){
				await interaction.reply(rollDice(20))
			}
		}	
	}
};