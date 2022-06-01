module.exports = {
    name: "checknsfw",
    description: "Check the Servers NSFW Level",
    category: "admin",
    adminOnly: true,
    async execute(client, interaction) {
        const nsfwLevel = interaction.guild.nsfwLevel;
        await client.say.successMessage(interaction, `NSFW Level: ${nsfwLevel}`, true);
    }
};