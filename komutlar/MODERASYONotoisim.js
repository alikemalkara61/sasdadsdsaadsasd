const { MessageEmbed } = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  const tagteyit = db.fetch(`ototag_${message.guild.id}`);
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;

  if (args[0] == "aç") {
    const hata = new MessageEmbed()
      .setColor("RED")
      .setAuthor("SİLO BOT")
      .setDescription(`**  Yanlış Kullanım ${prefix}oto-isim aç isim**`)
      .setFooter(`SİLO BOT`);
    if (!args[1]) return message.channel.send(hata);

    db.set(`otoisim_${message.guild.id}`, args[1]);
    const sa = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO BOT")
      .setDescription(`** İsim ${args[1]} Olarak Belirlendi**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }

  if (args[0] == "kapat") {
    db.delete(`otoisim_${message.guild.id}`);
    const sa = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO BOT")
      .setDescription(`** Oto İsim Sistemi Kapatıldı**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }

  const sa = new MessageEmbed()
    .setColor("RED")
    .setAuthor("SİLO BOT")
    .setDescription(`** Yanlış Kullanım ${prefix}oto-isim aç/kapat**`)
    .setFooter(`SİLO BOT`);
  if (!args[0]) return message.channel.send(sa);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-isim"],
  permLevel: 0
};
exports.help = {
  name: "oto-isim"
};
