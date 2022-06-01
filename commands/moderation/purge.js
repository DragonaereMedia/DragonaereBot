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
        const numberToDelete = interaction.options.getNumber('number');
        const thisChannel = interaction.options.getChannel('channel');
        let channelToPurge;
        if (thisChannel == null){
            channelToPurge = interaction.channel;
        } else {
            channelToPurge = thisChannel;
        }
        channelToPurge.bulkDelete(numberToDelete);
        await client.say.successMessage(interaction, `Purged ${numberToDelete} messages from ${channelToPurge}`, true);
    }
};