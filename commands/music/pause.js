module.exports = {
  name: "pause",
  description: "Pauses the current playing song.",
  category: "music",
  execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    if (queue.connection.paused)
      return client.say.warnMessage(interaction, "The song is already paused.");

    queue.setPaused(true);

    return client.say.successMessage(interaction, "Paused the current song.");
  }
};