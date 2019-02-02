const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let reviewmessage = args.slice(0).join(" ");

  let suggestEmbed = new Discord.RichEmbed()
  .setTitle("Suggestie")
  .setDescription("Bedankt voor de suggestie! wil jij ook een suggestie plaatsen doe =suggestie <jouw suggestie>")
  .addField("Suggestie door", `${message.author}`)
  .addField("Suggestie", `${reviewmessage}`)
  let suggestChannel = message.guild.channels.find(`id`, '495673463730601985')
  if(!suggestChannel) return message.channels.send(`De kanaal ideeën is verwijderd/nog niet gemaakt contacteer OfficieelFerdi#5109 voor dit probleem.`);

  message.delete()
  suggestChannel.send(suggestEmbed)


}

module.exports.help = {
  name: "suggestie"
}