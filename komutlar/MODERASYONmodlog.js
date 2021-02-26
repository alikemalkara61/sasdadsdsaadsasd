const { MessageEmbed } = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || "++";
  if (!message.member.hasPermission("ADMINISTRATOR")) return;

  const kanal = message.mentions.channels.first();
  if (!args[0]) {
    const sa = new MessageEmbed()
      .setColor("RED")
      .setAuthor("SİLO Bot")
      .setDescription(`** Yanlış Kullanım ${prefix}mod-log ayarla/sıfırla**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }

  if (args[0] === "ayarla") {
    if (!kanal) {
      const sa = new MessageEmbed()
        .setColor("RED")
        .setAuthor("SİLO Bot")
        .setDescription(`** Yanlış Kullanım ${prefix}mod-log ayarla #kanal**`)
        .setFooter(`SİLO BOT`);
      return message.channel.send(sa);
    }

    db.set(`log_${message.guild.id}`, kanal.id);
    const as = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO Bot")
      .setDescription(`** MOD-LOG Başarıyla Ayarlandı**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(as);
  }

  if (args[0] === "sıfırla") {
    db.delete(`log_${message.guild.id}`);
    const sa = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO Bot")
      .setDescription(`** MOD LOG Başarıyla Sıfırlandı**`)
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mod-log"],
  permLevel: 0
};

exports.help = {
  name: "modlog",
  description: "Botun davet linklerini gösterir.",
  usage: "davet"
};
