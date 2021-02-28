// require the discord.js module
const Discord = require('discord.js');
// TODO: Lorsque le bot rejoin un serveur automatiquement créer un fichier exemple : id.json contenant les donnés du serveur
const File = require('fs')
const client = new Discord.Client();
const { Controler_message } = require('./App/Controler/controler_message');
//TODO: par la suite ajouter une bdd pour stocker les infos
const { prefix, token, welcomeChannel } = require ('./config.json');


// TODO: add nsfw : https://www.npmjs.com/package/akaneko
// TODO: lorsqu'un personne rejoins un channel vocal spécifique créer un channel vocal et le moove dedans et créer un channel écris de config
client.once('ready', () => {
    console.log(`---------------------`);
    console.log(`Pseudo : ${client.user.username}`)
    console.log(`Compte : ${client.user.tag}`)
    console.log(`Prefix: "${prefix}"`)
    console.log(`Id: ${client.user.id}`)
    console.log(`---------------------`)
    var servers = client.guilds.valueOf().array().length;
    client.user.setActivity(`${prefix}help : in ${servers} servers`);
});
client.login(token);

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === welcomeChannel);
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});

client.on('message', message => {
    if (!message.guild && !message.author.bot) return;
    // Create channel
    // message.guild.channels.create('cc')

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // récupérer un argument
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    //récuperer la commande
    const command = args.shift().toLowerCase();

    let formatArg;
    if(args.length > 0){
        formatArg = args;
    }else{
        formatArg = false;
    }
    new Controler_message(command,message,formatArg);
});

client.on('error', e => {
    console.log(e);
})
