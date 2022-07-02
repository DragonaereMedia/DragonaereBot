module.exports = {
    name: "diceroll",
    description: "Roll a dice",
    category: "fun",
    async execute(client, interaction) {
        function generateResponse() {
            let numberReturned = Math.floor(Math.random()*6)+1;
            return numberReturned
        }
        await client.say.successMessage(interaction, `**${generateResponse()}**`);
    }
};