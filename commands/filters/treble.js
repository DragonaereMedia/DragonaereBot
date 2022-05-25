module.exports = {
  name: "treble",
  description: "Toggles the treble filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      treble: !queue.getFiltersEnabled().includes("treble")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("treble") ? "Applied" : "Removed"} the treble filter.`);
  }
};