module.exports = {
  name: "remove",
  description: "Removes a specific song from the queue",
  usage: "<trackIndex>",
  category: "music",
  options: [{
    name: "index",
    description: "The song index to remove",
    type: "NUMBER",
    required: true
  }],
  async execute(client, interaction) {
    let index = await interaction.options.getNumber("index", true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return client.say.warnMessage(interaction, "There's no song to remove in the queue.");

    index = index - 1;

    if (index < 0 || index > queue.tracks.length || !queue.tracks[index])
      return client.say.warnMessage(interaction, "Provided Song Index does not exist.");

    queue.remove(index);

    return client.say.successMessage(interaction, `Removed track \`${index+1}\`.`);
  }
};