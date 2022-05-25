module.exports = {
  name: "volume",
  description: "Check or change the volume",
  category: "music",
  options: [{
    name: "amount",
    description: "Changes the bot’s output volume",
    type: "NUMBER",
    required: false
  }],
  async execute(client, interaction) {
    const newVol = await interaction.options.getNumber("amount", false);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    if (!newVol) {
      const embed = client.say.baseEmbed(interaction)
        .setDescription(`Volume is at \`${queue.volume}%\`.`)
        .setFooter(`Use \'\/volume <1-200>\' to change the volume.`);

      return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }

    if (!Number.isInteger(newVol) || newVol > 200 || newVol < 0)
      return client.say.warnMessage(interaction, "Provide a valid number between 1 to 200.");

    queue.setVolume(newVol);

    return client.say.successMessage(interaction, `Volume is updated to \`${queue.volume}%\`.`);
  }
};