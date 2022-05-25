module.exports = {
  name: "seek",
  description: "Seeks to a specific position in the current song.",
  usage: "<mm:ss>",
  category: "music",
  options: [{
    name: "duration",
    description: "The duration to seek <mm:ss>",
    type: "STRING",
    required: true
  }],
  async execute(client, interaction) {
    let timeString = interaction.options.getString("duration", true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    const song = queue.current;

    if (song.live)
      return client.say.warnMessage(interaction, "Can't seek this live streaming song.");

    if (isNaN(timeString) && !timeString.includes(":"))
      return client.say.errorMessage(interaction, "Provide a valid duration to seek.");

    if (!isNaN(timeString)) timeString = `00:${timeString}`;

    const time = client.utils.toMilliseconds(timeString);

    if (!time || isNaN(time) || time > song.durationMS || time < 0)
      return client.say.warnMessage(interaction, "Provide a valid duration to seek.");

    queue.seek(time);

    return client.say.successMessage(interaction, `Seeked to \`${timeString}\`.`);
  }
};
