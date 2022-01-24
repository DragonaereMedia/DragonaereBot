const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!'),
		async execute(interaction) {
        		interaction.user.fetchFlags(true)
        		interaction.user.fetch(true)
        		userTag=interaction.user.tag
	        	userAvatar=interaction.user.displayAvatarURL('webp',128,true)
        		//userBanner=interaction.user.bannerURL('webp',512,true)
        		const userEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(userTag)
			.setThumbnail(userAvatar)
			//.addField(userBanner)
        		.addField(`Account Created ${interaction.user.createdAt}`)
        		.addField(`Joined Server ${interaction.guild.joinedAt}`)
			.setTimestamp()
			.setFooter({text:'/user'});
			await interaction.reply({embeds: [userEmbed]});
		},
};
