const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botEmbed = new Discord.RichEmbed()
    .setDescription("Bot informatie")
    .setColor("#cc5200")
    .addField("Bot naam", bot.user.username)
    .addField("Bot developer", "OfficieelFerdi#5109")
    .addField("Bot gemaakt op", bot.user.createdAt)
    .setFooter("Botinfo | WifiBot")
    .setTimestamp()

    message.channel.send(botEmbed);
}

module.exports.help = {
  name: "botinfo"
}