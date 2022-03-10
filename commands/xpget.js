// Mee6 thought it'd be funny to add NFTs
// I thought it'd be funny to replace it

const { SlashCommandBuilder } = require('@discordjs/builders');

// db.collection('guilds').doc(interaction.guild.id).collection('users').doc(interaction.user.id).get()

function getUserXp(userId) {
    let getUserXpMessage = `Level: \nXp: `
    return getUserXpMessage;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('xpget')
		.setDescription('Get a users XP')
        .addUserOption(userGet =>
            userGet.setRequired(true)),
	async execute(interaction){
		if (interaction.commandName === 'xpget') {
			await interaction.reply(getUserXp(userId))
		}
	}
};