const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
        //!vraag <antwoord>
        if (!args[2]) return message.reply("Stel een volledige vraag aub!");
        let replies = ["WifiBot zegt ja :white_check_mark:", "WifiBot zegt nee :x:", "WifiBot weet niks hierop te antwoorden :thinking:", "WifiBot zegt, stel de vraag later :timer:", "WifiBot zegt, Wat is dit voor vraag? :unamused:"];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");

        let vraagEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setColor("#007acc")
            .addBlankField()
            .addField("De vraag", question)
            .addField("Wat heeft de bot geantword? hier is de antwordt: ", replies[result])
            .addBlankField()
            .setTimestamp()

        message.channel.send(vraagEmbed);
    
}

module.exports.help = {
  name: "vraag"
}