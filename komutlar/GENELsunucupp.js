const Discord = require("discord.js");
exports.run = function(client, message, args) {
  const embed = new Discord.MessageEmbed()
    .setTitle("SUNUCU İKONU")
    .setImage(message.guild.iconURL({ dynamic: true }));
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-pp", "sunucu-ikon"],
  permLevel: 0
};
exports.help = {
  name: "sunucu-ikon"
};
