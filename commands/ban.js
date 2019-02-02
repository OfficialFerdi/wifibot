const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Nee toch, ik kan de gebruikersnaam niet vinden, doe het a.u.b goed voor de ban hamer die je gaat geven.");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Helaas, Je hebt geen toegang tot dit command alleen admins of hoger heeft toegang om te gebruiken.");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Wat denk jij te doen? je eigen staff verbannen? dat gaat helaas niet.");

    let banEmbed = new Discord.RichEmbed()
    .setTitle("BANNED")
    .setDescription("Verbannen Gebruikers")
    .setColor("#3333ff")
    .addField("Verbannen Gebruiker", `${bUser} met ID: ${bUser.id}`)
    .addField("Verbannen Door", `${message.author} met ID: ${message.author.id}`)
    .addField("Command Gebruikt In", message.channel)
    .addField("Reden", bReason);

    let banChannel = message.guild.channels.find(`name`, "bot-modlogs");
    if(!banChannel) return message.channel.send("Helaas, eerst moet er #bot-modlogs worden gemaakt, als je dit probleem niet weet te fixen contacteer OfficieelFerdi#5109 voor dit probleem.");

    await bUser.send(`:warning: Je bent Voorgoed verbannen van DeGamesSquad. :warning: \n Verbannen door: **${message.author.tag}** \n Reden: **${bReason}**`)

    message.guild.member(bUser).ban(bReason);
    message.channel.send(`Alright, **${bUser}** Is voorgoed verbannen! De ban reden: **${bReason}**.`)
    message.delete()
    banChannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}