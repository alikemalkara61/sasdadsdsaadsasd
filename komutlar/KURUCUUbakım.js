const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  if (message.author.id !== "727108703299436614")
    return message.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Bu Komutu Kullanabilmek İçin `727108703299436614` Kimliğine Sahip Olmanız Lazım"
        )
    );
  if (args[0] === "aç") {
    if (!args[1]) {
      message.channel.send("Bakım modu sebebini belirtin!");
    }
    db.set("bakım", args.slice(1).join(" "));
    if (args.slice(1).join(" ")) {
      message.channel.send("Bakım açıldı");
    }
  } else {
    if (args[0] === "kapat") {
      message.channel.send("Bakım Kapatıldı");
      db.delete("bakım");
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bakım"],
  permLevel: 0
};

exports.help = {
  name: "bakım",
  description: "Bakım.",
  usage: "Bakım"
};
