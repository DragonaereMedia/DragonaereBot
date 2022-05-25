module.exports = {
  name: "jump",
  description: "Jump to a specific track in the queue.",
  category: "music",
  usage: "<songIndex>",
  options: [{
    name: "index",
    description: "The song index to jump to",
    type: "NUMBER",
    required: true
  }],
  async execute(client, interaction) {
    let index = await interaction.options.getNumber("index", true);
    index = index - 1;

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return client.say.errorMessage(interaction, "There is no song in the queue.");

    if (index > queue.tracks.length || index < 0 || !queue.tracks[index])
      return client.say.errorMessage(interaction, "Provided song index does not exist.");

    queue.jump(index);

    return client.say.successMessage(interaction, `Jumped to song \`${index}\`.`);
  }
};