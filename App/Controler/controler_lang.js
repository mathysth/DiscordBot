const { lang } = require('../../lang.json');
const { Controler_lang_file } = require("./controler_lang_file");
const fs = require('fs');

class Controler_lang {
	// Content message
	message;
	// self
	self = null;
	// Asked lang
	lang = "fr";
	result = [];

	supportedLang = ['fr', 'en']

	constructor(lang,message) {
		if(lang && message){
			this.self = this;
			this.message = message;
			this.lang = lang;
			this.isLangSupported(lang);
		}
	}
	isLangSupported(){
		let isLangSupported;
		for(let i = 0; i < this.supportedLang.length; i++){
			if(this.lang == this.supportedLang[i]){
				isLangSupported = true;
			}
		}
		if(isLangSupported){
			let normalizedPath = require("path").join(__dirname, "./../lang/"+ this.lang+"/");
			let json = [];

			require("fs").readdirSync(normalizedPath).forEach(function(file) {
				json.push(require( normalizedPath + file));
			});

			this.result = json;
			new Controler_lang_file(this.message).setServerFileContent(this.lang,json);
			this.message.channel.send( '\"' + this.lang + '\" have been choose');
		}else{
			this.message.channel.send('This language is currently not supported');
		}
	}
	static getPhraseJson(key,message){
		let normalizedPath = require("path").join(__dirname, "../Modele/Servers/");
		let result = JSON.parse(fs.readFileSync(normalizedPath+message.guild.id+".json"));
		let array = result;

		try{
			for (let i = 0; i < array.arrayLang.length; i++){
				for (const arrayKey of array.arrayLang){
					if(arrayKey[key]){
						return arrayKey[key];
					}
				}
			}
		}catch (e) {
			console.log("key : \'" + key + "\' not found");
		}

	}
}
module.exports = {
	Controler_lang
}