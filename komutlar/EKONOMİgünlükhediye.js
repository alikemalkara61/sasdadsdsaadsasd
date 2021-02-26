const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  let para = await db.fetch(`para_${message.author.id}`);
  const talkedRecently = new Set();
  if (talkedRecently.has(message.author.id)) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Bu Komutu 24 Saatte Bir Kullanabilirsin" + message.author
      )
    );
  } else {
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      db.add(`para_${message.author.id}`, 100);
      message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "Başarılı! 100 Kredi Hesabınıza Yatırıldı."
        )
      );
      talkedRecently.delete(message.author.id);
    }, 86400000);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["günlük-maaş"],
  permLevel: 0
};

exports.help = {
  name: "günlük-maaş",
  description: "Bakım.",
  usage: "Bakım"
};
