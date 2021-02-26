const Discord = require("discord.js");
const db = require("wio.db");
const st = require("common-tags");
const slots = ["🍇", "🍊", "🍐", "🍒", "🍋"];

exports.run = async (client, message, args) => {
  let para = await db.fetch(`para_${message.author.id}`);
  let alınanpara = args[0] * 10;
  let eksiargs = args[0];
  var slot1 = slots[Math.floor(Math.random() * slots.length)];
  var slot2 = slots[Math.floor(Math.random() * slots.length)];
  var slot3 = slots[Math.floor(Math.random() * slots.length)];
  if (isNaN(args[0])) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("0-∞ Bir Sayı Gir")
    );
  }
  if (para < args[0]) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Yeterli Paranız Bulunamamaktadır."
      )
    );
  }
  if (!args[0]) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("0-∞ Bir Sayı Gir")
    );
  }
  if (args[0] < 0) {
    message.channel.send("0'ın Altında Bir Değer Giremezsin");
  } else {
    if (slot1 === slot2 && slot1 === slot3) {
      message.channel.send(
        new Discord.MessageEmbed().setDescription(`
        ${slot1} : ${slot2} : ${slot3}
        Girdiğin Miktar : ${eksiargs}
        Kazandığın Miktar : ${alınanpara}
        `)
      );
      db.add(`para_${message.author.id}`, alınanpara);
    } else {
      message.channel.send(
        new Discord.MessageEmbed().setDescription(`
        ${slot1} : ${slot2} : ${slot3}
        Girdiğin Miktar : ${eksiargs}
        Kaybettiğin Miktar : ${eksiargs}
        `)
      );
      db.add(`para_${message.author.id}`, -eksiargs);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slots"],
  permLevel: 0
};

exports.help = {
  name: "slots",
  description: "Slots oyunu oynatır",
  usage: "slots"
};
