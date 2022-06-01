module.exports = {
  name: "shutdown",
  description: "Shuts the bot down",
  ownerOnly: true,
  async execute(client, interaction) {
    await client.say.successMessage(interaction, "Shutting the bot down.....", true);

    process.exit(1);
  }
};