# Bot Discord
(Currently in development)

Bot Discord project using **nodeJS**
## Bot Overview
``
Games : 
``
* rock paper scissor
* soon

``
Moderation : 
``
* Ban user
* soon

``
Other : 
``
* Multiple lang (FR / EN)
* NSFW
* soon

## Configuration

Index:
```bash
app.js
```
How to use:
```bash
1 - Change Bot key in : config.json
2 - Start the bot with NodeJs
3 - Type !help to the general channel on your server. Good Job the bot now working 
```
## Bot Setup

``
Requirements:
``

* nodeJS knowledge
* JS knowledge
 
``
Setup:
``
1. Create your application on [discord](https://discord.com/developers/applications/)
2. To add your bot to your server you need to use this template : 
    https://discord.com/oauth2/authorize?client_id=your-application-id&scope=bot
3. Now stay on your application and build a bot
4. Copy your bot token and add it to the file config.json
5. If you want you can change the prefix tag 
6. Start the bot now is working :)

```json
{
  "prefix": "!",
  "token": "put-your-token"
}

```
 
## Vendor
[nodeJS](https://nodejs.org/en/)

[discordJS](https://discord.js.org)