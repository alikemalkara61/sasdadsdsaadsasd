const { MessageEmbed } = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if (args[0] == "aç") {
    const hata = new MessageEmbed()
      .setColor("#3f007f")
      .setAuthor("SİLO BOT")
      .setDescription(`**  Yanlış Kullanım ${prefix}ototag aç tag**`)
      .setFooter(`SİLO BOT`);
    if (!args[1]) return message.channel.send(hata);

    db.set(`ototag_${message.guild.id}`, args[1], "true");
    const sa = new MessageEmbed()
      .setColor("#3f007f")
      .setAuthor("SİLO BOT")
      .setDescription(`** Tag ${args[1]} Olarak Belirlendi**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }
  if (args[0] == "kapat") {
    db.delete(`ototag_${message.guild.id}`, false);
    const sa = new MessageEmbed()
      .setColor("#3f007f")
      .setAuthor("SİLO BOT")
      .setDescription(`** Oto Tag Sistemi Kapatıldı**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }

  const sa = new MessageEmbed()
    .setColor("#3f007f")
    .setAuthor("SİLO BOT")
    .setDescription(`** Yanlış Kullanım ${prefix}ototag aç/kapat**`)
    .setFooter(`SİLO BOT`);
  if (!args[0]) return message.channel.send(sa);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "oto-tagkdJAWMRUEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVIEUNOVWJQHECG9W4MVNT5U0HMEIJW544444CGIIIIII5BYUV9"
  ],
  permLevel: 0
};
exports.help = {
  name: "oto-tag"
};
