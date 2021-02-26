const Discord = require("discord.js");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINSTRATOR")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Bu Komutu Uygulamak İçin `ADMINSTRATOR` Yetkisine Sahip Olman Lazım"
      )

      .setColor("BLACK");
    message.channel.send(embed);
    return;
  }
  message.channel.clone().then(knl => {
    message.channel.delete();
    let position = message.channel.position;
    knl.setPosition(position);

    knl.send(
      new Discord.MessageEmbed()
        .setImage(
          "https://cdn.glitch.com/811c7d96-2369-4e41-89ee-747104d09cc0%2F1598597541551.jpg?v=1609152218794"
        )
        .setDescription("Nuked")
    );
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nuke"],
  permLevel: 0
};
exports.help = {
  name: "nuke",
  description: "Logo Yaparsınız",
  usage: "m-logo <yazı>"
};
