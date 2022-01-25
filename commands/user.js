const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');
const { MessageEmbed, GuildMember, User } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!'),
		async execute(interaction) {
			await interaction.user.fetch()
        	let userTag=interaction.user.tag
        	let userAvatar=interaction.user.displayAvatarURL({dynamic: true})
        	let userBanner=interaction.user.bannerURL({dynamic: true})
			let userCreatedDate=interaction.user.createdAt
			let userCreated=userCreatedDate.toLocaleString({timeZoneName: "short"})
			let userJoinedDate=interaction.member.joinedAt
			let userJoined=userJoinedDate.toLocaleString({timeZoneName: "short"})
        	const userEmbed = new MessageEmbed()
			.setTitle(userTag)
			.setThumbnail(userAvatar)
			.setImage(userBanner)
        	.addField('Account Created: ', `${userCreated}`)
        	.addField('Joined Server: ', `${userJoined}`)
			//.addField('Roles: ', `${interaction.member.roles.cache}`)
			.setTimestamp()
			.setFooter({text: "Generated using /user "});
			await interaction.reply({embeds: [userEmbed]});
		},
};
//{embeds: [userEmbed]}