module.exports = {
  name: "filter",
  description: "Filters commands",
  category: "music",
  options: [
    {
      type: "SUB_COMMAND",
      name: "reset",
      description: "Reset all applied filters."
    },
    {
      type: "SUB_COMMAND",
      name: "show",
      description: "Shows all filters."
    }
  ],
  async execute(client, interaction) {
    const subCmd = await interaction.options.getSubcommand(true);

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    const filters = queue.getFiltersEnabled();


    if (subCmd === "reset") {
      if (!filters.length)
        return client.say.warnMessage(interaction, "No filter is applied now.");

      queue.setFilters({});

      return client.say.successMessage(interaction, "Removed all applied filters.");
      
    } else {
      const enabledFilters = queue.getFiltersDisabled();
      const disabledFilters = queue.getFiltersDisabled();

      const enFDes = enabledFilters.map((f) => `**${client.utils.toCapitalize(f)}** --> ✅`).join("\n");

      const disFDes = disabledFilters.map((f) => `**${client.utils.toCapitalize(f)}** --> ❌`).join("\n");

      const embed = client.say.baseEmbed(interaction)
        .setTitle("All Audio Filters")
        .setDescription(`${enFDes}\n\n${disFDes}`);

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  }
};