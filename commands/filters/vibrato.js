module.exports = {
  name: "vibrato",
  description: "Toggles the vibrato filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      vibrato: !queue.getFiltersEnabled().includes("vibrato")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("vibrato") ? "Applied" : "Removed"} the vibrato filter.`);
  }
};