const { owners } = require("../../config.json");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return;

    await client.application?.commands.fetch(interaction.commandId).catch((e) => console.log(e));

    try {
      const command = client.commands.get(interaction.command?.name ?? "")

      if (!command) return;
      if (!interaction.commandId) return;

      if ((command.category === "botowner" || command.ownerOnly === true) && !owners.includes(interaction.user.id))
        return client.say.errorMessage(interaction, "This command can only be used by the bot owners.");

      await command.execute(client, interaction);
    } catch (err) {
      client.utils.sendErrorLog(client, err, "error");
      if (interaction.replied) return;
      return client.say.errorMessage(interaction, "Something went wrong. Sorry for the inconveniences.");
    }
  }
};