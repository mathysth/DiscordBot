const { RockPaperScissors } = require('../Modele/Games/rock-paper-scissors');
const { Modules } = require('../Modele/Utils/modules');

class Controler_game {
	// Asked Game
	game;
	// Number of player
	player_number;
	// Current message
	message;
	// Listing of game
	gameslist = ['rockpaperscissors'];
	gameslistDesc = ['rockpaperscissors'];

	constructor(game, message) {
		if (message) {
			this.message = message;
			if (game) {
				this.game = Modules.formatText(game);
				this.askNumberOfPlayer();
			}
			else {
				this.askWitchGameToLaunch();
			}
		}
	}

	askWitchGameToLaunch() {
		const embed = new Modules(this.message);
		const gameList = [];
		let prefix = 'Pour lancer le jeu répond : ';

		for (let i = 0; i < this.gameslist.length; i++) {
			gameList.push({ name: this.gameslist[i], value: prefix + this.gameslist[i], inline: false });
		}

		embed.embedConstructor('Nos jeux', 'Pour lancer un jeu : !games mygame', gameList, this.message.author.username, this.message.author.iconURL);

	}

	askNumberOfPlayer() {
		for (let i = 0; i < this.gameslist.length; i++) {
			if (this.game == this.gameslist[i]) {
				this.message.channel.send('Veuillez enter le nombre de joueurs');
				this.message.channel.awaitMessages(m => m.author.id === this.message.author.id, {
					max: 1,
					time: 20000,
				}).then(response => {
					this.player_number = parseInt(response.first().content);
					this.getAskedGame();
				});
			}
			else {
				this.message.reply('Ce jeu n\'existe pas');
			}
		}
	}

	getAskedGame() {
		switch (this.game) {
		case 'rockpaperscissors': {
			new RockPaperScissors(this.player_number, this.message);
			break;
		}
		}
	}

}

module.exports = {
	Controler_game,
};