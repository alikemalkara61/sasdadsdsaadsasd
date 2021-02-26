const { MessageEmbed } = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
let parametreler = ["aç", "kapat"];
exports.run = async (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if (!message.member.hasPermission("MANAGE_GUİLD")) return;

  if (args[0] == "aç") {
    db.set(`sa-as_${message.guild.id}`, true);
    const sa = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO BOT")
      .setDescription(`** SA-AS Başarıyla Açıldı**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }
  if (!parametreler.includes(args[0]))
    return message.channel.send(
      `Geçerli parametreleri kullanmalısın.\nParametreler: ${parametreler.join(
        " - "
      )}`
    );

  if (args[0] == "kapat") {
    db.delete(`sa-as_${message.guild.id}`);
    const sa = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO BOT")
      .setDescription(`** SA-AS Başarıyla Kapatıldı**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }
  const sa = new MessageEmbed()
    .setColor("RED")
    .setAuthor("SİLO BOT")
    .setDescription(`** Yanlış Kullanım ${prefix}++sa-as aç/kapat**`)
    .setFooter(`SİLO BOT`);
  if (!args[0]) return message.channel.send(sa);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sa-as"],
  permLevel: 0
};
exports.help = {
  name: "sa-as"
};
