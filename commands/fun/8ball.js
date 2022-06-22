module.exports = {
    name: "8ball",
    description: "Ask the 8Ball a question",
    category: "fun",
    options: [{
        name: "question",
        description: "What do you want to ask the 8Ball?",
        type: "STRING",
        required: true
    }],
    async execute(client, interaction) {
        const responses = ["It is certain", "Reply hazy, try again","Don’t count on it", "It is decidedly so","Ask again later","My reply is no","Without a doubt","Better not tell you now",	"My sources say no","Yes definitely","Cannot predict now",	"Outlook not so good","You may rely on it","Concentrate and ask again",	"Very doubtful","As I see it, yes","Most likely","Outlook good","Yes","Signs point to yes"];
        let questionString = interaction.options.getString("question", true);
        function generateResponse() {
            let arrayNumber = Math.floor(Math.random()*19);
            return responses[arrayNumber]
        }
        await client.say.successMessage(interaction, `**Question:** ${questionString}\n**Answer:** ${generateResponse()}`);
    }
};