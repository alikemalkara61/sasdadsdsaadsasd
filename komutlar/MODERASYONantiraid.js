const { MessageEmbed } = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
let parametreler = ["aç", "kapat"];
exports.run = async (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if (!message.member.hasPermission("MANAGE_GUİLD")) return;
  let kanal = message.mentions.channels.first();
  if (args[0] == "aç") {
    db.set(`antiraidK_${message.guild.id}`, kanal.id);
    const sa = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO BOT")
      .setDescription(`** Anti-raid Başarıyla Açıldı**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }
  if (!parametreler.includes(args[0]))
    return message.channel.send(
      new MessageEmbed().setDescription(
        `Geçerli parametreleri kullanmalısın.\nParametreler: ${parametreler.join(
          " - "
        )}`
      )
    );

  if (args[0] == "kapat") {
    db.delete(`antiraidK_${message.guild.id}`);
    const sa = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO BOT")
      .setDescription(`** Anti-Raid Başarıyla Kapatıldı**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }
  const sa = new MessageEmbed()
    .setColor("RED")
    .setAuthor("SİLO BOT")
    .setDescription(
      `** Yanlış Kullanım ${prefix}anti-raid aç/kapat #logkanalı**`
    )
    .setFooter(`SİLO BOT`);
  if (!args[0]) return message.channel.send(sa);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["anti-raid"],
  permLevel: 0
};
exports.help = {
  name: "antiraid"
};
