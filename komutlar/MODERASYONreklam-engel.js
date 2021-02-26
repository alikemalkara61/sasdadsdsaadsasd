const db = require("wio.db");

const Discord = require("discord.js");

let ayarlar = ["aç", "kapat"];

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Bu Komutu Uygulamak İçin `BAN_MEMBERS` Yetkisine Sahip Olman Lazım"
      )
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Sistemi Aktif Etmek İçin **aç** Deaktif Etmek İçin **kapat** Yazınız"
      )
    );

  if (!ayarlar.includes(args[0]))
    return message.channel.send(
      `Geçerli parametreleri kullanmalısın.\nParametreler: ${ayarlar.join(
        " - "
      )}`
    );

  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send("`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!");

  if (args[0] == "aç") {
    if (db.has(`reklam_${message.guild.id}`))
      return message.channel.send(
        new Discord.MessageEmbed().setDescription("Sistem Zaten Açık")
      );

    db.set(`reklam_${message.guild.id}`, "acik");

    message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Reklam Engel başarıyla açıldı! `Üyeleri Yasakla` yetkisine sahip olanların reklamı engellenmicektir."
      )
    );
  }

  if (args[0] == "kapat") {
    if (!db.has(`reklam_${message.guild.id}`))
      return message.channel.send(
        new Discord.MessageEmbed().setDescription("Sistem Zaten Kapalı")
      );

    db.delete(`reklam_${message.guild.id}`);

    message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Reklam Engel Başarı İle Kapatıldı "
      )
    );
  }
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: ["reklam-engel"],

  permLevel: 0
};

exports.help = {
  name: "reklam-engelle",

  description: "Reklam Sistemini Akif Eder",

  usage: "reklam-engelle"
};
