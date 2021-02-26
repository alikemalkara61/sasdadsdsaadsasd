const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  let para = await db.fetch(`para_${message.author.id}`);
  if (para === null) {
    message.channel.send(
      new Discord.MessageEmbed().setDescription(
        `Güncel Nakit Para Bakiyeniz : 0`
      )
    );
  } else {
    message.channel.send(
      new Discord.MessageEmbed().setDescription(
        `Güncel Nakit Bakiyeniz : ${para}`
      )
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bakiyem"],
  permLevel: 0
};

exports.help = {
  name: "bakiyem",
  description: "Bakım.",
  usage: "Bakım"
};
