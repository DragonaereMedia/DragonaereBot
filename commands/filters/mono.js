module.exports = {
  name: "mono",
  description: "Toggles the mono filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      mono: !queue.getFiltersEnabled().includes("mono")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("mono") ? "Applied" : "Removed"} the mono filter.`);
  }
};