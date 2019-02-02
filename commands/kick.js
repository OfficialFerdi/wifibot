const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Nee toch, ik kan de gebruikersnaam niet vinden, doe het a.u.b goed voor de KickOut die je gaat geven.");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Helaas, Je hebt geen toegang tot dit command alleen Moderators of hoger heeft toegang om te gebruiken.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Wat denk jij te doen? je eigen staff verwijderen? dat gaat helaas niet.");

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("KICKED")
    .setDescription("Verwijderde Gebruikers")
    .setColor("#3333ff")
    .addField("Verwijderde Gebruiker", `${kUser} met ID ${kUser.id}`)
    .addField("Verwijderd Door", `${message.author} met ID ${message.author.id}`)
    .addField("Command Gebruikt In", message.channel)
    .addField("Reden", kReason);

    let kickChannel = message.guild.channels.find(`name`, "bot-modlogs");
    if(!kickChannel) return message.channel.send("Helaas, eerst moet er #bot-modlogs worden gemaakt, als je dit probleem niet weet te fixen contacteer OfficieelFerdi#5109 voor dit probleem.");

    await kUser.send(`:warning: Je bent verwijderd in DeGamesSquad. :warning: \n Verwijderd door: **${message.author.username}** \n De reden: **${kReason}**`)

    message.guild.member(kUser).kick(kReason);
    message.channel.send(`Alright, ${kUser} got kicked! kicked reason, **${kReason}**.`)
    message.delete();
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name: "kick"

}