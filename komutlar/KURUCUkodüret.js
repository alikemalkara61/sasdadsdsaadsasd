const Discord = require("discord.js");

const db = require("wio.db");

exports.run = async (client, message, args) => {
  if (message.author.id !== "727108703299436614")
    return message.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Bu Komutu Kullanabilmek İçin `727108703299436614` Kimliğine Sahip Olmanız Lazım"
        )
    );
  var generator = require("generate-password");

  var kod = generator.generate({
    length: 10,
    numbers: true
  });

  if (!args[0]) return message.channel.send(`**HATA** - Bir Miktar Belirt`);
  db.set(`kod.${kod}`, args[0]);
  message.channel.send("Başarılı");
  message.author.send(`\`\`\`${kod}\`\`\``);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kod-üret"],
  permLevel: 0
};

exports.help = {
  name: "kod-üret",

  description: "Komutu yükler.",
  usage: "load "
};
