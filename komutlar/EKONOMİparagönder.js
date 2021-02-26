const Discord = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  let para = await db.fetch(`para_${message.author.id}`);
  const user = message.mentions.users.first();

  if (isNaN(args[1])) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("0-∞ Bir Sayı Gir")
    );
  }
  if (message.mentions.users.size < 1)
    return message.cahannel.send(
      new Discord.MessageEmbed().setDescription("Bir Kullanıcı Etiketlemelisin")
    );
  if (para < args[1]) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Yeterli Paranız Bulunamamaktadır."
      )
    );
  }
  if (!args[1]) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("0-∞ Bir Sayı Gir")
    );
  }
  if (user.id === message.author.id) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("Kendine Para Gönderemezsin")
    );
  }
  if (args[1] < 0) {
    return;
    message.channel.send("0'ın Altında Bir Değer Giremezsin");
    if (message.mentions.users.size < 1)
      return message.cahannel.send(
        new Discord.MessageEmbed().setDescription(
          "Bir Kullanıcı Etiketlemelisin"
        )
      );
    db.add(`para_${message.author.id}`, -args[0]);
    db.add(`para_${user.id}`, args[1]);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["para-gönder"],
  permLevel: 0
};

exports.help = {
  name: "send-money",
  description: "Slots oyunu oynatır",
  usage: "slots"
};
