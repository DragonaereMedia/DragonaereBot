module.exports = {
  name: "8d",
  description: "Toggles the 8D filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      "8D": !queue.getFiltersEnabled().includes("8D")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("8D") ? "Applied" : "Removed"} the 8D filter.`);
  }
};