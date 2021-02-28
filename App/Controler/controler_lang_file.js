const fs = require('fs');

class Controler_lang_file{

	message;
	constructor(message) {
		this.message = message;
	}

	async createUpdateFile(serverFile,inJsonFile,message,logConsole){
		let date = this.getTodayDate();
		fs.writeFile(serverFile, inJsonFile, function (err) {
			if (err) throw err;
			console.log(logConsole + message.guild.id + " on : " + date);
		});
	}

	getTodayDate(){
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;

		return today;
	}

	setServerFileContent(lang,langArray = null){
		let normalizedPath = require("path").join(__dirname, "../Modele/Servers/");
		let serverFile = normalizedPath+this.message.guild.id+".json";
		let serverInfo = {
			"serverOwner" : this.message.guild.owner.user.tag,
			"serverName" : this.message.guild.name,
			"serverId" : this.message.guild.id,
			"lang" : lang,
			"arrayLang": langArray
		};
		let inJsonFile;
		if(langArray){
			inJsonFile = JSON.stringify(serverInfo);
		}

		if (fs.existsSync(serverFile)) {
			this.createUpdateFile(serverFile,inJsonFile,this.message, "json update for server : ");
		}else{
			this.createUpdateFile(serverFile,inJsonFile,this.message, "json create for server : ");
		}
	}

}
module.exports = {
	Controler_lang_file
}