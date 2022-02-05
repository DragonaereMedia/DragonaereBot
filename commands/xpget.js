// Mee6 thought it'd be funny to add NFTs
// I thought it'd be funny to replace it

const { SlashCommandBuilder } = require('@discordjs/builders');

var admin = require("firebase-admin");

var firebase = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(firebase)
});

const db = admin.firestore();

// db.collection('guilds').doc(interaction.guild.id).collection('users').doc(interaction.user.id).get()

function getUserXp(userId) {
    let userData = db.collection('guilds').doc(interaction.guild.id).collection('users').doc(userId);
    let userLvl = userData.getString("userLvl");
    let userXp = userData.getString("userId");
    let getUserXpMessage = `Level: ${userLvl}\nXp: ${userXp}`
    return getUserXpMessage;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('xpget')
		.setDescription('Get a users XP')
        .addUserOption(userGet =>
            userGet.setRequired(true)),
	async execute(interaction){
		if (interaction.commandName === 'xpget') {
			await interaction.reply(getUserXp(userId))
		}
	}
};