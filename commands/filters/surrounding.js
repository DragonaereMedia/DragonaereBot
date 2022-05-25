module.exports = {
  name: "surrounding",
  description: "Toggles the surrounding filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      surrounding: !queue.getFiltersEnabled().includes("surrounding")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("surrounding") ? "Applied" : "Removed"} the surrounding filter.`);
  }
};