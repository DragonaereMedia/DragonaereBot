module.exports = {
    name: "kys",
    description: "Don't try it",
    category: "fun",
    async execute(client, interaction) {
        let memberId = interaction.user.id;
        interaction.guild.members.kick(memberId);
        interaction.channel.createInvite(maxAge = 600).then(invite => interaction.member.send(`**Join Back**: ${invite.url} *only lasts 10 minutes*`).catch(client.say.errorMessage(interaction, "An error has occured")));
       
        await client.say.successMessage(interaction, `Bye Bye`);
    }
};