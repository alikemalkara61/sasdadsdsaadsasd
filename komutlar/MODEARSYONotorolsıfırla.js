const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = (client, message, args) => {


  if (!db.fetch(`otorolkanal_${message.guild.id}`))
    return message.channel.send(
      new Discord.MessageEmbed().setColor("RED").setDescription("Bu Özellik Zaten  kapalı")
    );

  message.reply(
    new Discord.MessageEmbed().setColor("GREEN").setDescription("Otorol Başarıyla Sıfırlandı")
  );
  db.delete(`otorolkanal_${message.guild.id}`);
  db.delete(`otorolrol_${message.guild.id}`);
  db.delete(`otorolcodwamesaj_${message.guild.id}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorol-sıfırla"],
  permLevel: 4
};

exports.help = {
  name: "otorolkapat",
  description: "taslak",
  usage: "otorolkapat"
};
