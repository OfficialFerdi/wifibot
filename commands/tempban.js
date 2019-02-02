const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Helaas, Je hebt geen toegang tot dit command alleen admins of hoger heeft toegang om te gebruiken.");

  var user = message.guild.member(message.mentions.users.first());

  if (!user) return message.channel.send("Nee toch, ik kan de gebruikersnaam niet vinden, doe het a.u.b goed voor de ban hamer die je gaat geven.");

  if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Wat probeer je nou? je eigen staff member tijdelijk te bannen? nou dat gaat helaas niet. :)");

  var reason = args.join(" ").slice(22 + args[2].length);

  if(!reason) return message.channel.send(":warning:, Geef een reden op voor de tijdelijke ban!");
  
  if(args.length < 2) {
    message.channel.send("Geef een tijd, een persoon voor tijdelijk te bannen.")
    return;
  }
  var tempBanTime = args[1];

  if(ms(tempBanTime)) {

    await message.guild.member(user).ban(reason);

    let tempbanEmbed = new Discord.RichEmbed()
    .setDescription("TEMP-BANNED")
    .setColor("#bc0000")
    .addField("Tempbanned Gebruiker", `${user} met ID: ${user.id}`)
    .addField("Tempbanned Door", `${message.author} met ID: ${message.author.id}`)
    .addField("Command Gebruikt In", message.channel)
    .addField("Tempban Tijd", `${tempBanTime}`)
    .addField("Reden", reason);

    let banChannel = message.guild.channels.find(`name`, "bot-modlogs");
    if(!banChannel) return message.channel.send("Helaas, eerst moet er #bot-modlogs worden gemaakt, als je dit probleem niet weet te fixen contacteer OfficieelFerdi#5109 voor dit probleem.");

    await user.send(`:warning: Je bent tijdelijk verbannen van DeGamesSquad. :warning: \n Verbannen door: **${message.author.tag}** \n Reden: **${reason}**`)

    message.delete();
    message.channel.send(`Begrepen, **${user}** heeft niet goed geluisterd en heeft een tijdelijke ban gekregen! ;)`)
    modchannel.send(tempbanEmbed);

    setTimeout(function () {

      message.guild.unban(user.id)

      message.channel.send(`**${user}** is geunbanned, houd er rekening mee als die weer doorgaat dat jullie het melden naar de admins of hoger voor perm ban.`)
    }, ms(tempBanTime));
  }

}

module.exports.help = {
  name: "tempban"
}