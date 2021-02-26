const { MessageEmbed } = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  const ayarlar = require("../ayarlar.json");
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  let kanal = message.mentions.channels.first();
  let role = message.mentions.roles.first();

  if (args[0] == "embed") {
    const sa = new MessageEmbed()
      .setColor("RED")
      .setAuthor("SİLO Bot")
      .setDescription(
        `** Yanlış Kullanım ${prefix}tepki-rol :emojiniz: @rol #kanal Mesajınız || Sadece Discordun Kendi Emojileri Desteklenmektedir**`
      )
      .setFooter(`SİLO Bot`);
    if (!args[1] || !role || !kanal || !args[4])
      return message.channel.send(sa);

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(args[4])
      .setFooter(`SİLO Bot`);
    return kanal.send(embed).then(async msg => {
      await msg.react(args[1]);
      db.push(`react_${message.guild.id}`, {
        kanal: kanal.id,
        mesaj: msg.id,
        role: role.id,
        emoji: args[1]
      });
      const sa = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor("SİLO Bot")
        .setDescription(`**  ${kanal} Kanalında Embedli Tepki Rol Olacak**`)
        .setFooter(`SİLO Bot`);
      return message.channel.send(sa);
    });
  }
  if (args[0] == "normal") {
    const sa = new MessageEmbed()
      .setColor("RED")
      .setAuthor("SİLO Bot")
      .setDescription(
        `**Yanlış Kullanım ${prefix}tepki-rol :emojiniz: @rol #kanal Mesajınız || Sadece Discordun Kendi Emojileri Desteklenmektedir**`
      )
      .setFooter(`SİLO Bot`);
    if (!args[1] || !role || !kanal || !args[4])
      return message.channel.send(sa);

    await kanal.messages.fetch(args[4]).then(msg => {
      msg.react(args[1]);
      db.push(`react_${message.guild.id}`, {
        kanal: kanal.id,
        mesaj: args[4],
        role: role.id,
        emoji: args[1]
      });
      const sa = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor("SİLO Bot")
        .setDescription(`** | ${kanal} Kanalında Normal Tepki Rol Olacak**`)
        .setFooter(`SİLO Bot`);
      return message.channel.send(sa);
    });
  }
  const sa = new MessageEmbed()
    .setColor("RED")
    .setAuthor("SİLO Bot")
    .setDescription(`** Yanlış Kullanım ${prefix}tepki-rol embed/normal**`)
    .setFooter(`SİLO Bot `);
  if (!args[0]) return message.channel.send(sa);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tepki-rol", "tepkirol"],
  permLevel: 0
};

exports.help = {
  name: "tepki-rol"
};
