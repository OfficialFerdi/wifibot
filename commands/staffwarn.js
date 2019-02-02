const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./staffwarns.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    
        if(!message.member.roles.find('id', `530060967053230090`)) return message.channel.send("Helaas, Je hebt geen toegang tot dit command alleen Managements heeft toegang om te gebruiken.");
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if(!wUser) return message.channel.send("Nee toch, ik kan de gebruikersnaam niet vinden, doe het a.u.b goed voor de waarschuwing die je gaat geven.");
        if(wUser.roles.find('id', `530060967053230090`)) return message.channel.send("Wat denk jij te doen? je eigen Management waarschuwen? dat gaat helaas niet want alleen managements kunnen staff waarschuwen.");
        let wReason = args.join(" ").slice(22);
    
        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
          };
    
          warns[wUser.id].warns++;
    
        fs.writeFile("./staffwarns.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err)
        });
    
        let warnEmbed = new Discord.RichEmbed()
        .setTitle("WARNED")
        .setDescription("Gewaarschuwde Staff")
        .setColor("#3333ff")
        .addField("Gewaarschuwde Staff", `${wUser} met ID: ${wUser.id}`)
        .addField("Gewaarschuwd Door", `${message.author} met ID: ${message.author.id}`)
        .addField("Command Gebruikt In", message.channel)
        .addField("Reden", `${wReason}`)
    
        let warnChannel = message.guild.channels.find('name', `staffwarns`)
        if(!warnChannel) return message.channel.send(`Helaas, eerst moet er #staffwarns worden gemaakt, als je dit probleem niet weet te fixen contacteer OfficieelFerdi#5109 voor dit probleem.`)
    
        wUser.send(`:warning: Je bent gewaarschuwd als staff in DeGamesSquad :warning: \n Gewaarschuwd door: **${message.author.tag}** \n De reden: ${wReason}`)

        message.delete();
        message.channel.send(`**:white_check_mark: Alright, ${wUser} Is gewaarschuwd! De reden: _${wReason}_ Ik hoop voor je dat je naar de management gaat luisteren.**`)
        warnChannel.send(warnEmbed);



}

module.exports.help = {
  name: "staffwarn"
}