const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Helaas, kan de naam niet vinden. check de spelling of je het goed deed.")
    let rReason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("REPORTED")
    .setDescription("Gerapporteerde Gebruikers")
    .setColor("#15f153")
    .addField("Gerapporteerde Gebruiker", `${rUser} met ID: ${rUser.id}`)
    .addField("Gerapporteerd Door", `${message.author} met ID: ${message.author.id}`)
    .addField("Command Gebruikt In", message.createdAt)
    .addField("Reden", rReason);

    let reportschannel = message.guild.channels.find(`name`, "reports-log");
    if(!reportschannel) return message.channel.send(":warning: Helaas, de admins moeten #reports-log eerst maken, lukt dat niet? dan contacteer OfficieelFerdi#5109 voor dit probleem. :warning:");

    await message.author.send(":white_check_mark: **Je hebt succesvol de speler gerapporteerd! wij zullen er zo spoedig mogelijk erna kijken. bedankt voor je geduld.**")
    message.delete();
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}