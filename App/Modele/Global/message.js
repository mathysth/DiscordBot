if (message.content === `${prefix}server`) {
	let embedMessage = new Discord.MessageEmbed();
	//embedMessage.setAuthor('Mathys');
	embedMessage.setColor('orange');
	embedMessage.setTitle('Test bot');
	embedMessage.setDescription('Test d\'une description');
	embedMessage.addField('Serveur', message.guild.name,true)
	embedMessage.addField('Nombre d\'utilisateurs', message.guild.memberCount,true)
	embedMessage.setFooter(`par ${message.guild.name}` ,'https://cdn.discordapp.com/avatars/208927632614490115/6f03acd598d46b7db340c1f1a7e1e00f.png?size=256');

	message.channel.send(embedMessage);
}
if (message.content === `${prefix}user-info`) {
	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
}
if(message.content === `${prefix}rockpaperscissors`) {
	let isRockPaperScissorActive = false;

	if (isRockPaperScissorActive) {
		message.reply('Tu as actuellement une session en cours finis la ou attend 1 minute pour jouer de nouveau');
	}
	else {
		isRockPaperScissorActive = true;
		message.reply('Veuillez entrer le nombre de joueur(s)');
		message.channel.awaitMessages(m => m.author.id === message.author.id, {
			max: 1,
			time: 10000
		}).then(collected => {
			let playerNumber = collected.first().content;
			if (parseInt(playerNumber)) {
				console.log(playerNumber);
				new RockPaperScissors(parseInt(playerNumber), message);
			}
			else {
				message.reply('Nombre invalide ')
			}
		})
	}
}
if(message.content == 'insulte moi'){
	message.reply('alle t ban');

	const user = message.mentions.users.first();
	message.guild.members.ban(message.author.id).then(collected => {
		message.channel.send(message.author.username + ' à été banni')
	}).catch( err => {
		message.channel.send('Permission inssufisante');
	});
}