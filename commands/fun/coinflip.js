module.exports = {
    name: "coinflip",
    description: "Flip a coin",
    category: "fun",
    async execute(client, interaction) {
        function generateResponse() {
            let flipVariable = Math.random();
            if (flipVariable < .5) {
                return 'Heads'
            }
            else {
                return 'Tails'
            }
        }
        await client.say.successMessage(interaction, `${generateResponse()}`);
    }
};