module.exports = {
  name: "nowplaying",
  description: "Shows details of the currently playing song.",
  category: "music",
  options: [{
    name: "index",
    type: "NUMBER",
    description: "That song index.",
    required: true
  }],
  async execute(client, interaction) {
    let index = await interaction.options.getNumber("index", true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.current)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    index = index - 1;

    if (!queue.tracks[index] || index > queue.tracks.length || index < 0)
      return client.say.errorMessage(interaction, "Provided Song Index does not exist.");

    const song = queue.tracks[index]

    const embed = client.say.baseEmbed(interaction)
      .setAuthor("Now Playing 🎵")
      .setTitle(`${song.title}`)
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(`~ Requested by: ${song.requestedBy.toString()}
Duration: ${song.duration}
Position in queue: ${index}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};