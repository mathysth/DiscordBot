const { Controler_lang } = require('./controler_lang');
const { Controler_lang_file } = require('./controler_lang_file');
const { Controler_game } = require('./controler_game');
const { Controler_nsfw } = require('./controler_nsfw');
const { Modules } = require('./../Modele/Utils/modules');

class Controler_message {
	message_content;
	message;
	// to check if command need an arg
	needArg;
	arg;
	//TODO: par la suite le changer en tableau associatif avec section
	commandList = ['games', 'lang', 'help'];

	constructor(content, message, args) {
		if (content && message) {
			this.message_content = content;
			this.message = message;
			if (args) {
				this.arg = args;
			}
			this.controlMessage();
		}
	}

	controlMessage() {
		switch (this.message_content) {
		case 'games': {
			new Controler_game(this.arg, this.message);
			break;
		}

		case 'nsfw': {
			if (this.message.channel.nsfw) {
				new Controler_nsfw(this.arg, this.message);
			}
			else {
				this.message.channel.send('Vous ne pouvez pas envoyer ce genre de message dans ce channel. Veuillez le faire dans un channel nswf');
			}
			break;
		}

		case 'lang': {
			this.needArg = true;
			if (this.checkIfNeedArg()) {
				const response = new Controler_lang(this.arg, this.message);
			}
			break;
		}

		case 'play': {
			this.needArg = true;
			if (this.checkIfNeedArg()) {

			}
			break;
		}

		case 'help': {
			this.needArg = false;
			if (!this.checkIfNeedArg()) {
				let embedModule = new Modules(this.message);
				let embedFields = [];

				for (let i = 0; i < this.commandList.length; i++) {
					embedFields.push({ name: this.commandList[i], value: '!' + this.commandList[i], inline: true });
				}
				embedModule.embedConstructor('Help Section', 'List of all commands', embedFields, this.message.author.username, this.message.author.avatarURL());
			}
			break;
		}

		default: {
			this.message.channel.send('Pour connaire toutes les commandes : !help');
			break;
		}
		}
	}

	checkIfNeedArg() {
		if (!this.needArg) {
			if (this.arg) {
				this.message.channel.send('This command don\'t require any argument');
				return true;
			}
			return false;
		}
		else {
			if (!this.arg) {
				this.message.channel.send('This command need an argument');
				return null;
			}
			return true;
		}
	}

}

module.exports = {
	Controler_message,
};