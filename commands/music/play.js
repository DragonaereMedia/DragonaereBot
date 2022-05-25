module.exports = {
  name: "play",
  description: "Play a song or playlist from url or name",
  category: "music",
  usage: "<song url/name>",
  options: [{
    name: "song",
    description: "The song name/url, you want to play.",
    type: "STRING",
    required: true
  }],
  async execute(client, interaction) {
    try {

      if (!client.utils.havePermissions(interaction))
        return client.say.errorMessage(interaction, "I need **\`EMBED_LINKS\`** permission.");

      const string = await interaction.options.getString("song", true);

      const guildQueue = client.player.getQueue(interaction.guild.id);

      const channel = interaction.member?.voice?.channel;

      if (!channel)
        return client.say.warnMessage(interaction, "You have to join a voice channel first.");

      if (guildQueue) {
        if (channel.id !== interaction.guild.me?.voice?.channelId)
          return client.say.warnMessage(interaction, "I'm already playing in a different voice channel!");
      } else {
        if (!channel.viewable)
          return client.say.warnMessage(interaction, "I need **\`VIEW_CHANNEL\`** permission.");
        if (!channel.joinable)
          return client.say.warnMessage(interaction, "I need **\`CONNECT_CHANNEL\`** permission.");
        if (!channel.speakable)
          return client.say.warnMessage(interaction, "I need **\`SPEAK\`** permission.");
        if (channel.full)
          return client.say.warnMessage(interaction, "Can't join, the voice channel is full.");
      }

      let result = await client.player.search(string, { requestedBy: interaction.user }).catch(() => { });
      if (!result || !result.tracks.length)
        return client.say.errorMessage(interaction, `No result was found for \`${string}\`.`);

      let queue;
      if (guildQueue) {
        queue = guildQueue;
        queue.metadata = interaction;
      } else {
        queue = await client.player.createQueue(interaction.guild, {
          metadata: interaction
        });
      }

      try {
        if (!queue.connection) await queue.connect(channel);
      } catch (error) {
        client.logger.error("JOIN", error);
        client.player.deleteQueue(interaction.guild.id);
        return client.say.errorMessage(interaction, `Could not join your voice channel!\n\`${error}\``);
      }

      result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

      if (!queue.playing) await queue.play();
    } catch (e) {
      console.log(e)
    }
  }
};