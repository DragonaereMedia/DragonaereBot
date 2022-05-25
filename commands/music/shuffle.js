module.exports = {
  name: "shuffle",
  description: "Shuffles the queue.",
  category: "music",
  execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return client.say.warnMessage(interaction, "Need at least \`3\` songs in the queue to shuffle.");

    queue.shuffle();

    return client.say.successMessage(interaction, "Shuffled the queue.");
  }
};