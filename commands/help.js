const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let helpEmbed = new Discord.RichEmbed()
    .setTitle("Help Menu")
    .setDescription("Krijg hier commands van de bot, als er :x: emoji verschijnt dan is het nog niet gemaakt.")
    .setColor("#cccc00")
    .addField("Help Commands", `=help - Help menu die je net hebt geopent. \n =report - Report iemand die zich misdraagt. \n =botinfo - Krijg informatie over de bot. \n =suggestie - Plaats een suggestie`)
    .addField("Staff Commands", `=ban - Ban voorgoed een persoon. \n =tempban - Ban tijdelijk een persoon. \n =kick - Verwijder een persoon. \n =warn - Waarschuw een persoon \n =staffwarn - Waarschuw een staff (alleen management kunnen dit doen) \n =tempmute - mute tijdelijk een persoon.`)
    .addField("Ticket Systeem", `+help - Krijg hulp commands voor support ticket met WifiBot Tickets.`)
    .addField("Andere/Fun Commands", `=vraag - Stel een vraag aan de bot.`)
    .setFooter("Help | WifiBot")
    .setTimestamp()

    message.channel.send(helpEmbed);

}

module.exports.help = {
  name: "help"
}