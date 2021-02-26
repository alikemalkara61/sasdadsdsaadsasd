const { Discord, MessageEmbed } = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new MessageEmbed()
      .setColor("#0AFF00")
      .setDescription(`Bunun için yetkin yok.`)
      .setFooter(
        `${client.user.username} HG-BB sistemi.`,
        message.guild.iconURL({ dynamic: true })
      )
      .setTimestamp();
    message.channel.send(embed).then(a => a.delete({ timeout: 10000 }));
    return;
  } else {
    if (await db.fetch(`hgbbKanal_${message.guild.id}`)) {
      const embed = new MessageEmbed()
        .setColor("#0AFF00")
        .setDescription(
          `HG-BB  Kanalı Sunucuda Zaten Aktif.\n Sıfırlamak için ${prefix}hg-bb-sıfırla`
        )
        .setFooter(
          `${client.user.username} HG-BB  Sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(embed).then(a => a.delete({ timeout: 10000 }));
      return;

      return;
    }
    const kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new MessageEmbed()
        .setColor("#0AFF00")
        .setDescription(`Bir Kanal Etiketlemelisin.`)
        .setFooter(
          `${client.user.username} HG-BB`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(embed).then(a => a.delete({ timeout: 10000 }));
      return;
    } else {
      await db.set(`hgbbKanal_${message.guild.id}`, kanal.id);
      const embed = new MessageEmbed()
        .setColor("#0AFF00")
        .setDescription(
          `HG-BB Kanalı Başarıyla <#${kanal.id}> Olarak Ayarlandı.`
        )
        .setFooter(
          `${client.user.username} HG-BB  Sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(embed).then(a => a.delete({ timeout: 10000 }));
      return;
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hg-bb-ayarla"],
  permLevel: 0
};

exports.help = {
  name: "hg-bb-ayarla"
};
