const { QueueRepeatMode } = require("discord-player");

module.exports = {
  name: "loop",
  description: "Change the loop mode (autoplay|track|queue|off)",
  category: "music",
  options: [
    {
      type: "SUB_COMMAND",
      name: "mode",
      description: "Shows current set loop mode."
    },
    {
      type: "SUB_COMMAND",
      name: "off",
      description: "Turn the looping off"
    },
    {
      type: "SUB_COMMAND",
      name: "queue",
      description: "Loop the queue (all songs)"
    },
    {
      type: "SUB_COMMAND",
      name: "track",
      description: "Repeat the current song"
    },
    {
      type: "SUB_COMMAND",
      name: "autoplay",
      description: "Autoplay related songs after queue end"
    }
  ],
  async execute(client, interaction) {
    const subCmd = await interaction.options.getSubcommand(true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    let mode;
    switch (subCmd) {
      case "off":
        queue.setRepeatMode(QueueRepeatMode.OFF);
        mode = "Turned off loop mode.";
        break;
      case "track":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
        mode = "Looping Current Track";
        break;
      case "queue":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        mode = "Looping queue enabled.";
        break;
      case "autoplay":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
        mode = "Autoplay mode activated.";
        break;
      default:
        let md = "none";
        if (queue.repeatMode === 3) {
          md = "autoplay";
        } else if (queue.repeatMode == 2) {
          md = "queue";
        } else if (queue.repeatMode == 1) {
          md = "track";
        } else if (queue.repeatMode == 0) {
          md = "off";
        }

        const embed = client.say.baseEmbed(interaction)
          .setDescription(`Loop mode is set to: \`${md}\`.`)
          .setFooter(`Use \'\/loop <off|track|queue|autoplay>\' to change loop mode.`);
        return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }

    return client.say.successMessage(interaction, `${mode}`);
  }
};