module.exports = {
  name: "reverse",
  description: "Toggles the reverse filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      reverse: !queue.getFiltersEnabled().includes("reverse")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("reverse") ? "Applied" : "Removed"} the reverse filter.`);
  }
};