module.exports = {
  name: "skip",
  description: "Skips the current song",
  category: "music",
  execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1 && queue.repeatMode !== 3)
      return client.say.warnMessage(interaction, "No more songs in the queue to skip.");

    queue.skip();

    return client.say.successMessage(interaction, "Skipped to the next song.");
  }
};