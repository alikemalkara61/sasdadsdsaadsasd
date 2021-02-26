const Discord = require("discord.js");
const google = require("google-tts-api");
const ayarlar = require("../ayarlar.json");
const db = require("wio.db");

exports.run = async(client, message) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  const ps5 = message.content.slice(prefix.length).split(" ");
  const komut = ps5.shift().toLowerCase();
  const ps6 = message.member.voice.channel;
  if (!ps6)
    return message.channel.send(
      new Discord.MessageEmbed().setColor("RED").setDescription(
        "İlk Önce Bir Sesli Kanala Girmen Gerek"
      )
    );
  google(`${ps5.slice(" ")}`, "tr", 1).then(url => {
    message.member.voice.channel.join().then(connection => {
      message.channel.send(
        new Discord.MessageEmbed().setColor("GREEN").setDescription(
          `**${ps5.slice(" ")}** Adlı Mesaj Sesli Olarak Söyleniyor`
        )
      );
      connection.play(url).on("end", () => {
        connection.disconnect();
      });
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["söyle"],
  permLevel: 0
};
exports.help = {
  name: "söylet",
  description: "Bota yazdığınız şeyi sesli mesaj olarak söyletir",
  usage: "söylet <mesaj>"
};
