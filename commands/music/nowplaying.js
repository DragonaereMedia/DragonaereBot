module.exports = {
  name: "nowplaying",
  description: "Shows details of the currently playing song.",
  category: "music",
  async execute(client, interaction) {

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.current)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    const track = queue.current;

    const embed = client.say.baseEmbed(interaction)
      .setAuthor("Now Playing 🎵")
      .setTitle(`${track.title}`)
      .setURL(`${track.url}`)
      .setThumbnail(`${track.thumbnail}`)
      .setDescription(`${queue.createProgressBar(timecodes = true, length = 15)}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};