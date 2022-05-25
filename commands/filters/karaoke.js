module.exports = {
  name: "karaoke",
  description: "Toggles the karaoke filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      kakaoke: !queue.getFiltersEnabled().includes("karaoke")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("karaoke") ? "Applied" : "Removed"} the kakaoke filter.`);
  }
};