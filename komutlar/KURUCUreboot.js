const Discord = require("discord.js");
const db = require("wio.db");
exports.run = async (client, message) => {
  if (message.author.id !== "727108703299436614")
    return message.send(
      new Discord.MessageEmbed().setColor("RED").setDescription(
        "Bu Komutu Kullanabilmek İçin `727108703299436614` Kimliğine Sahip Olmanız Lazım"
      )
    );
  {
    message.channel
      .send(
        new Discord.MessageEmbed().setColor("GREEN").setDescription("Bot Yeniden Başlatılıyor...")
      )
      .then(message => {
        process.exit(0);
      });
  }
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: ["reboot"],

  permLevel: 0
};

exports.help = {
  name: "reboot",

  description: "yenden başlat",

  usage: "teboot"
};
