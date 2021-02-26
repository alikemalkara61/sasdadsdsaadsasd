const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.channel.send(
      ":x: bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız"
    );
  let sec = args[0];

  let kanal = message.mentions.channels.first();
  let rol = message.mentions.roles.first();

  if (!sec) {
    return message.reply(
      new Discord.MessageEmbed().setDescription(
        ` Örnek Kullanımı \`${prefix}otorol-ayarla @rol #logkanalı\` `
      )
    );
  }
  if (!args[1]) {
    return message.reply(
      new Discord.MessageEmbed().setDescription(
        ` Örnek Kullanımı \`${prefix}otorol-ayarla @rol #logkanalı\` `
      )
    );
  }
  message.reply(
    new Discord.MessageEmbed().setDescription(
      `Otorol Aktif Edildi\n Verilecek Rol ${rol} Olarak Ayarladım!\n Otorol Log Kanalını ${kanal} Olarak Ayarladım..`
    )
  );

  db.set(`otorolkanal_${message.guild.id}`, kanal.id);
  db.set(`otorolrol_${message.guild.id}`, rol.id);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorol-ayarla"],
  permLevel: 0
};

exports.help = {
  name: "otorol-ayarla"
};
