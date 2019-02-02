const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!clear 15
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Helaas kan staff alleen dit");
  if(!args[0]) return message.channel.send("Geef een aantal cijfers voor de berichten te verwijderen.");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`:white_check_mark: **_${args[0]} Berichten verwijderd._**`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}