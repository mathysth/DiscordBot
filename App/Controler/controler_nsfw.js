const akaneko = require('akaneko');
const { Modules } = require('./../Modele/Utils/modules');

class Controler_nsfw{

	type;
	message;
	commandList = [
		"ass",
		"bdsm",
		"blowjob",
		"cum",
		"doujin",
		"feet",
		"femdom",
		"foxgirl",
		"gifs",
		"glasses",
		"hentai",
		"netorare",
		"maid",
		"masturbation",
		"orgy",
		"panties",
		"pussy",
		"school",
		"tentacles",
		"thighs",
		"uglyBastard",
		"uniform",
		"yuri",
		"zettaiRyouiki",
		"cumslut"
	];

	constructor(type = null,message) {
		this.message = message;
		if (type){
			this.type = type;
			this.executeCommand()
		}else{
			this.renderAllType()
		}
	}


	renderAllType() {
		let embedModule = new Modules(this.message);
		let embedFields = [];
		//todo: faire un mini desc pou chacun
		for (let i = 0; i < this.commandList.length; i++) {
			embedFields.push({ name: this.commandList[i],value: "(°_°)" ,inline: false });
		}
		embedModule.embedConstructor('Nos commandes nsfw', 'Liste de toutes les commandes', embedFields, this.message.author.username, this.message.author.avatarURL());

	}


	async executeCommand() {

		async function getNsfw(type,message,commandList) {
			switch (type) {
				case "ass":{
					return message.channel.send(await akaneko.nsfw.ass());
				}
				case "bdsm": {
					return message.channel.send(await akaneko.nsfw.bdsm());
				}
				case "blowjob": {
					return message.channel.send(await akaneko.nsfw.blowjob());
				}
				case "cum": {
					return message.channel.send(await akaneko.nsfw.cum());
				}
				case "doujin": {
					return message.channel.send(await akaneko.nsfw.doujin());
				}
				case "feet": {
					return message.channel.send(await akaneko.nsfw.feet());
				}
				case "femdom": {
					return message.channel.send(await akaneko.nsfw.femdom());
				}
				case "foxgirl": {
					return message.channel.send(await akaneko.nsfw.foxgirl());
				}
				case "gifs": {
					return message.channel.send(await akaneko.nsfw.gifs());
				}
				case "glasses": {
					return message.channel.send(await akaneko.nsfw.glasses());
				}
				case "hentai": {
					return message.channel.send(await akaneko.nsfw.hentai());
				}
				case "netorare": {
					return message.channel.send(await akaneko.nsfw.netorare());
				}
				case "maid": {
					return message.channel.send(await akaneko.nsfw.maid());
				}
				case "masturbation": {
					return message.channel.send(await akaneko.nsfw.masturbation());
				}
				case "orgy": {
					return message.channel.send(await akaneko.nsfw.orgy());
				}
				case "panties": {
					return message.channel.send(await akaneko.nsfw.panties());
				}
				case "pussy": {
					return message.channel.send(await akaneko.nsfw.pussy());
				}
				case "school": {
					return message.channel.send(await akaneko.nsfw.school());
				}
				case "tentacles": {
					return message.channel.send(await akaneko.nsfw.tentacles());
				}
				case "thighs": {
					return message.channel.send(await akaneko.nsfw.thighs());
				}
				case "uglyBastard": {
					return message.channel.send(await akaneko.nsfw.uglyBastard());
				}
				case "uniform": {
					return message.channel.send(await akaneko.nsfw.uniform());
				}
				case "yuri": {
					return message.channel.send(await akaneko.nsfw.yuri());
				}
				case "zettaiRyouiki": {
					return message.channel.send(await akaneko.nsfw.zettaiRyouiki());
				}
				case "cumslut": {
					return message.channel.send(await akaneko.nsfw.cumslut());
				}

				default: {
					return getNsfw(commandList[await getRandomInt()],message,commandList)
				}
			}
			async function getRandomInt() {
				return Math.floor(Math.random() * Math.floor(commandList.length));
			}
		}

		await getNsfw(Modules.formatText(this.type), this.message,this.commandList);

	}
}
module.exports = {
	Controler_nsfw
}