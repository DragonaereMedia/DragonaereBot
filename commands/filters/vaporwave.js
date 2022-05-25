module.exports = {
  name: "vaporwave",
  description: "Toggles the vaporwave filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      vaporwave: !queue.getFiltersEnabled().includes("vaporwave")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("vaporwave") ? "Applied" : "Removed"} the vaporwave filter.`);
  }
};