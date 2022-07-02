module.exports = {
    name: "purge",
    description: "Clear the Chat of a set Ammount of Messages",
    category: "moderation",
    modOnly: true,
    options: [{
        name: "number",
        description: "How many Messages Should be Deleted",
        type: "NUMBER",
        required: true
    },
    {
        name: "channel",
        description: "What channel needs cleansing",
        type: "CHANNEL",
        required:false
    }],
    async execute(client, interaction) {
        let channelToPurge;
        if (interaction.options.getChannel('channel') == null){
            channelToPurge = interaction.channel;
        } else {
            channelToPurge = interaction.options.getChannel('channel');
        }
        await channelToPurge.bulkDelete(interaction.options.getNumber('number'));
        return client.say.successMessage(interaction, `Purged ${interaction.options.getNumber('number')} messages from ${channelToPurge}`, true);
    }
};