module.exports = {
  name: "nightcore",
  description: "Toggles the nightcore filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      nightcore: !queue.getFiltersEnabled().includes("nightcore")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("nightcore") ? "Applied" : "Removed"} the nightcore filter.`);
  }
};