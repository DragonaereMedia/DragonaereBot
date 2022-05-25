module.exports = {
  name: "subboost",
  description: "Toggles the subboost filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      subboost: !queue.getFiltersEnabled().includes("subboost")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("subboost") ? "Applied" : "Removed"} the subboost filter.`);
  }
};