const Discord = require('discord.js');

class Modules {
	message;

	constructor(message) {
		this.message = message
	}

	embedConstructor(title,descriptions,fields ,footer,footer_image = null,color = null,thumbnail = null,image = null){
		// inside a command, event listener, etc.
		const embedConstructor = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(title)
			.setDescription(descriptions)
			.setThumbnail(thumbnail)
			.setImage(image)
			.setTimestamp()
			.setFooter(footer, footer_image);

		for(let i = 0; i < fields.length; i++){
			embedConstructor.addField(fields[i]['name'],fields[i]['value'] ,fields[i]['inline']);
		}

		this.message.channel.send(embedConstructor);
	}

	static formatText(sent_msg){
		let message = JSON.stringify(sent_msg);

		message = message.replace("[","");
		message = message.replace("]","");
		message = message.replace("\"","");
		message = message.replace("\"","");

		return message;
	}
}


module.exports = {
	Modules
}