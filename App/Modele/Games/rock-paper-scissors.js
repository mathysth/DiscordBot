const Discord = require('discord.js');
const lang = require('../../../lang.json')
const { Controler_lang } = require('./../../Controler/controler_lang');

//TODO: Ajouter le moyen d'avoir 2 joueurs
class RockPaperScissors {
	// Main User
	 mainUser;
	 // Main User Weapon
	 mainUserWeapon;
	 //Comptabilise les points du joueur principale
	 static mainUserPoint = 0;
	 // Other user if there is more than 1
	 otherUser;
	 // Other User Weapon
	 otherUserWeapon;
	 // Bot try to beat the main user
	 bot;
	 // Bot Weapon
	 botWeapon ;
	 // Comptabilisé les points du bot
	 static botPoint = 0;
	 // Get current messages
	 message;
	// Weapon of rockPaperScissors
	 weapon = ["pierre", 'papier', 'ciseau']

	  constructor(user_number,message) {
	 	this.message = message;
		if(parseInt(user_number)){
			if(user_number === 1){
				this.bot = "bot";
				this.mainUser = message.author.username;
				message.channel.send('Vous avez décidé de jouer contre notre robot bonne chance :cowboy:');
				message.channel.send('Un joueur est renté dans la partie son nom : ' + this.mainUser);
				this.pickOne('bot');
				this.askMainUserWeapon();
			}else{
				this.otherUser = user_number;
			}
		}else{
			message.channel.send('Veuillez rentrer un nombre de joueurs valide');
		}
	 }

	 getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	askMainUserWeapon(){
	 	let message = this.message;
		message.channel.send('Choisissez votre arme : ' + this.weapon[0] + ', ' + this.weapon[1] + ', ' + this.weapon[2] );
		message.channel.awaitMessages( m => m.author.id === message.author.id,{
			max: 1,
			time: 20000
		}).then(collected =>{
			let userResponse = collected.first().content;

			for (let i = 0; i < this.weapon.length; i++){
				if(userResponse === this.weapon[i]){
					message.reply(' à choisi ' + userResponse);
				}
			}

			if (userResponse.toLowerCase() === "pierre") {
				this.mainUserWeapon = 0;
				this.tellWinner()
			} else if (userResponse.toLowerCase() === "papier") {
				this.mainUserWeapon = 1;
				this.tellWinner()
			}else if(userResponse.toLowerCase() === "ciseau"){
				this.mainUserWeapon = 2;
				this.tellWinner()
			}else{
				this.pickOne('user');
				this.tellWinner();
			}

		}).catch(err =>{
			message.reply('Votre temps de réponse à expiré nous allons donc chosir pour vous :stuck_out_tongue:');
			this.pickOne('user');
			this.tellWinner();
		});



		this.mainUserWeapon = this.message.content;
	}

	askOtherUserWeapon(){

	}

	/**
	 * Got random weapon for the bot
	 * @returns {string}
	 */
	 pickOne(target) {
	 	if(target === 'bot'){
			this.botWeapon = this.getRandomInt(this.weapon.length);
		}else if (target  === 'user'){
			this.mainUserWeapon = this.getRandomInt(this.weapon.length);
		}
	 }

	 witchWeaponWin(){
	 	if(this.bot){
	 		let winner;
	 		let isTied;

			// Check all possibility
			if (this.mainUserWeapon == this.botWeapon){
				isTied = 'none';
			}else{
				isTied = 'ok';
			}
			// Check for Winner
			if(this.mainUserWeapon == 0 && this.botWeapon == 1){
				winner = this.bot;
			}
			if(this.mainUserWeapon == 0 && this.botWeapon == 2){
				winner = this.mainUser;
			}

			if(this.mainUserWeapon == 1 && this.botWeapon == 0){
				winner = this.mainUser;
			}
			if(this.mainUserWeapon == 1 && this.botWeapon == 2){
				winner = this.bot;
			}

			if(this.mainUserWeapon == 2 && this.botWeapon == 0){
				winner = this.bot;
			}
			if(this.mainUserWeapon == 2 && this.botWeapon == 1){
				winner = this.mainUser;
			}

			if(winner == this.mainUser){
				RockPaperScissors.mainUserPoint += 1;
			}else if (winner == this.bot){
				RockPaperScissors.botPoint += 1;
			}

			if(isTied == 'ok'){
				return winner
			}else{
				return false;
			}
		}
	 }

	 showPoint(){
	 	if (this.bot){
			this.message.channel.send('Récapitulatif : ');
			this.message.channel.send(this.mainUser + ' à actuellement ' + RockPaperScissors.mainUserPoint + ' point(s)');
			this.message.channel.send(this.bot + ' à actuellement ' + RockPaperScissors.botPoint + ' point(s)');
		}
	 }

	 getUserWeaponById(idWeapon){
	 	if(idWeapon == 0){
	 		return this.weapon[0];
		}else  if (idWeapon == 1){
			return this.weapon[1];
		}else if (idWeapon == 2){
			return this.weapon[2];
		}
	 }

	/**
	 *
	 * @return the Winner
	 */
	 tellWinner(){
	 	// If opponent is bot
		let winner = this.witchWeaponWin();
		if(winner){
			if(this.bot){
				if(this.mainUser == winner){
					this.message.channel.send(winner + ' à choisi ' + this.getUserWeaponById(this.mainUserWeapon) + ' et à battu ' + this.bot + ' qui avait choisi : '+ this.getUserWeaponById(this.botWeapon));
				}else{
					this.message.channel.send(winner + ' à choisi ' + this.getUserWeaponById(this.botWeapon) + ' et à battu ' + this.mainUser + ' qui avait choisi : '+ this.getUserWeaponById(this.mainUserWeapon));
				}
			}
		}else{
			this.message.channel.send('Pas de gagnant vous avez tous choisi ' + this.getUserWeaponById(this.mainUserWeapon));
		}
		this.showPoint();
	 }

}

module.exports = {
	RockPaperScissors
};