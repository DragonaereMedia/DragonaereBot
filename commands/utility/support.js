
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "support",
  description: "Join the discord support server",
  category: "utility",
  execute(bot, interaction) {
    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[Click to join the support server.](${process.env.supportServer})`);

    const row = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Server Link")
      .setStyle("LINK")
      .setURL(`${process.env.supportServer}`)
    ]);

    return interaction.reply({ ephemeral: true, components: [row] });
  }
};