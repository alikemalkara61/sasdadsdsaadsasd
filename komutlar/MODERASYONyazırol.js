const Discord = require("discord.js");
const db = require("wio.db");

const ayarlar = require("../ayarlar.json"),
  prefix = ayarlar.prefix;
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("Yetkiniz Bulunmamaktadır!");
  const data = await db.fetch(`yazı_${message.guild.id}`);
  const rol = message.mentions.roles.first();
  const msj = args[1];
  if (data == null) await db.set(`yazı_${message.guild.id}`, []);
  await db.push(`yazı_${message.guild.id}`, { mesaj: msj, rol: rol.id });
  if (!args[0]) {
    message.channel.send("++yazı-rol @rol yazılcakyazı");
  }

  if (rol) {
    message.channel.send("bir rol etiketlemelisin");
  }
  if (msj) {
    message.channel.send("bir mesaj girmelisin");
  }
  const embed = new Discord.MessageEmbed().setDescription(
    `Yazı Rol Sistemi Aktif Edildi :) Sınırsız Yazı Koyma Hakkınız Bulunmaktadır Yazı Rolün Bilgileri \n Rol : \`${rol.name}\` Yazı : \`${prefix}${msj}\``
  );
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yazı-rol", "yazırol"],
  permLevel: 0
};

exports.help = {
  name: "yazırol",
  description: "",
  usage: "otorol rol kanal"
};
