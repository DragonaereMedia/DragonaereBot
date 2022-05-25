module.exports = {
  name: "clear",
  description: "Clears the current queue.",
  category: "music",
  execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return client.say.warnMessage(interaction, "There is currently no song in the queue.");

    queue.clear();

    return client.say.successMessage(interaction, "Cleared the queue.");
  }
};