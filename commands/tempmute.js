const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if(args.length < 2) {
        message.channel.send("Geef een tijd, een persoon en een reden op voor diegene te muten.")
        return;
    }
    let mutetime = args[1];
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Ohnee! ik kan de naam niet vinden. :( heb je de spelling van de naam verkeerd gedaan? dan doe het goed voor de mute! :zipper_mouth:")
    let toReason = args.join(" ").slice(22 + args[2].length);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Helaas, Je hebt geen toegang tot dit command alleen staff en hoger heeft toegang om te gebruiken.")
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Wat probeer je nou? je eigen staff member te muten? nou dat gaat helaas niet. :)")
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
        message.guild.channel.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
        
        }catch(e){
            
            console.log(e.stack);
        }
    }

    try {
        await(tomute.addRole(muterole.id));
    } catch (e) {
        
        console.log(e.stack);
    }
    let muteEmbed = new Discord.RichEmbed()
    .setTitle("MUTED")
    .setColor("#4d4dff")
    .setDescription("Muted Gebruikers")
    .addField(`Muted gebruiker`, `${tomute} met ID: ${tomute.id}`)
    .addField(`Muted door`, `${message.author} met ID: ${message.author.id}`)
    .addField("Mute tijd", `${ms(ms(mutetime))}`)
    .addField(`Reden`, `${toReason}`);

    let muteChannel = message.guild.channels.find(`name`, "bot-modlogs");
    if(!muteChannel) return message.channel.send("Helaas, eerst moet er #bot-modlogs worden gemaakt, als je dit probleem niet weet te fixen contacteer OfficieelFerdi#5109 voor dit probleem.");

    message.channel.send(`Alright, ${tomute} heeft teveel gespammed/gescholden of andere dingen en is daarom Muted!`)
    message.delete();
    muteChannel.send(muteEmbed);

    setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.send(`${tomute} Is geunmute, hopelijk houd diegene aan de afspraken.`);
    }, ms(mutetime));
}

module.exports.help = {
  name: "tempmute"
}