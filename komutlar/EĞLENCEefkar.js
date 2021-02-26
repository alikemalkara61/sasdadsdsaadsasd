const Discord = require("discord.js");

exports.run = (client, message) => {
  const random = Math.floor(Math.random() * 100) + 1;
  message.channel.send(
    new Discord.MessageEmbed().setColor("GREEN").setDescription(`Efkarınız %${random} Efkar`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["efkar"],
  permLevel: 0
};
exports.help = {
  name: "efkar",
  description: "saane",
  usage: "efkar"
};
