module.exports = {
  name: "pulsator",
  description: "Toggles the pulsator filter.",
  category: "filters",
  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      pulsator: !queue.getFiltersEnabled().includes("pulsator")
    });

    return client.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("pulsator") ? "Applied" : "Removed"} the pulsator filter.`);
  }
};