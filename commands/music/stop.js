module.exports = {
  name: "stop",
  description: "Stops the playback.",
  category: "music",
  execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    queue.stop();

    return client.say.successMessage(interaction, "Stopped the music.");
  }
};