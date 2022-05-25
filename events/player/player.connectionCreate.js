module.exports = {
  name: "connectionCreate",
  execute(client, queue, connection) {
    const embed = client.say.baseEmbed(queue)
      .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
      .setDescription(`👍 Joined ${connection.channel.toString()} and 📄 bound to ${queue.metadata.channel.toString()}`);

    return queue.metadata.reply({ embeds: [embed] }).catch(console.error);
  }
};