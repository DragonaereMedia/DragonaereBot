const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Gets the Bots ping!'),
	async execute(interaction) {
		await interaction.reply(`${Math.round(message.createdTimestamp - interaction.createdTimestamp)}ms`);
	},
};
