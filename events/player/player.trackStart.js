const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "trackStart",
  execute(client, queue, track) {
    if (!client.utils.havePermissions(queue.metadata.channel)) return;

    const embed = client.say.baseEmbed(queue)
      .setTitle("Now playing")
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`);

    return queue.metadata.channel.send({ embeds: [embed] });
  }
};