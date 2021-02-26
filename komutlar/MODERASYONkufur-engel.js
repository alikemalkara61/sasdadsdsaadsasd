const Discord = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Bu Komutu Uygulamak İçin `BAN_MEMBERS` Yetkisine Sahip Olman Lazım"
      )

      .setColor("BLACK");
    message.channel.send(embed);
    return;
  }

  if (args[0] === "aç") {
    db.set(`kufurengel.${message.guild.id}`);
    message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Başarı İle Küfür Engel Aktif Edildi"
      )
    );
    return;
  }
  if (args[0] === "kapat") {
    db.delete(`kufurengel.${message.guild.id}`);
    message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Başarı İle Küfür Engel Deaktif Edildi"
      )
    );
    return;
  }
  message.channel.send(
    new Discord.MessageEmbed().setDescription("Lütfen aç Yada Kapat Yazın")
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-engel"],
  permLevel: 0
};

exports.help = {
  name: "küfür-engelle",
  description: "Davet Log Kanalını Belirler",
  usage: "davet-kanal-ayarla #kanal"
};
