const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const db = require("wio.db");

exports.run = async (client, message) => {
  let aylar = {
    "01": "Ocak",
    "02": "subat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayis",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Agustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasim",
    "12": "Aralik"
  };

  let gunler = {
    "0": "Pazar",
    "1": "Pazartesi",
    "2": "Salı",
    "3": "Çarþamba",
    "4": "Perþembe",
    "5": "Cuma",
    "6": "Cumartesi"
  };
  var ban = message.guild.fetchBans();
  let guild = message.guild;
  let pc = message.guild.members.cache
    .filter(m => !m.user.bot && m.user.presence.status !== "offline")
    .filter(m => Object.keys(m.user.presence.clientStatus).includes("desktop"))
    .size;
  let web = message.guild.members.cache
    .filter(m => !m.user.bot && m.user.presence.status !== "offline")
    .filter(m => Object.keys(m.user.presence.clientStatus).includes("web"))
    .size;
  let mobil = message.guild.members.cache
    .filter(m => !m.user.bot && m.user.presence.status !== "offline")
    .filter(m => Object.keys(m.user.presence.clientStatus).includes("mobile"))
    .size;
  const embed = new Discord.MessageEmbed()
    .setColor("15f153")
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField("İsim kısaltması:", message.guild.nameAcronym, true)
    .addField("Sunucu ID:", message.guild.id, true)
    .addField("Ana kanal:", message.guild.defaultChannel || "Yok", true)
    .addField("AFK kanalı:", message.guild.afkChannel || "Yok", true)
    .addField("AFK Zaman Aşımı", `${message.guild.afkTimeout} saniye`, true)
    .addField(
      "Güvenlik Seviyesi:",
      message.guild.verificationLevel || "Yok",
      true
    )

    .addField(
      "Kanal Sayısı: [" + message.guild.channels.cache.size + "]",
      `:sound: ${
        message.guild.channels.cache.filter(chan => chan.type === "voice").size
      } :speech_balloon: ${
        message.guild.channels.cache.filter(chan => chan.type === "text").size
      }`,
      true
    )

    .addField("Sunucu Bölgesi:", message.guild.region, true)
    .addField("Rol sayısı", message.guild.roles.cache.size, true)
    .addField(
      "Sahibi:",
      message.guild.owner + `` + `\n(<@` + message.guild.ownerID + `>)`,
      true
    )
    .addField(
      "Katılma Tarihi",
      message.guild.owner.user.createdAt
        .toUTCString()
        .replace("Nov", "Kasım")
        .replace("Jan", "Ocak")
        .replace("Feb", "Şubat")
        .replace("Mar", "Mart")
        .replace("Aug", "Ağustos")
        .replace("Sep", "Eylül")
        .replace("Oct", "Ekim")
        .replace("Fri", "Cuma")
        .replace("Mon", "Pazartesi")
        .replace("Sun", "Pazar")
        .replace("Sat", "Cumartesi")
        .replace("Tue", "Salı")
        .replace("Wed", "Çarşamba")
        .replace("Thu", "Perşembe"),
      true
    )
    .addField(
      "Oluşturma tarihi:",
      message.guild.createdAt
        .toDateString()
        .replace("Nov", "Kasım")
        .replace("Jan", "Ocak")
        .replace("Feb", "Şubat")
        .replace("Mar", "Mart")
        .replace("Aug", "Ağustos")
        .replace("Sep", "Eylül")
        .replace("Oct", "Ekim")
        .replace("Fri", "Cuma")
        .replace("Mon", "Pazartesi")
        .replace("Sun", "Pazar")
        .replace("Sat", "Cumartesi")
        .replace("Tue", "Salı")
        .replace("Wed", "Çarşamba")
        .replace("Thu", "Perşembe"),
      true
    )
    .addField(
      ` **__Son Üyeler__**`,
      `\n•  Son 1 Saatte Giren Üyeler \n \`${
        message.guild.members.cache.filter(
          a => new Date().getTime() - a.joinedTimestamp < 3600000
        ).size
      }\` \n• Son 1 Günde Giren Üyeler \n \`${
        message.guild.members.cache.filter(
          a => new Date().getTime() - a.joinedTimestamp < 86400000
        ).size
      }\` \n•  Son 1 Haftada Giren Üyeler \n \`${
        message.guild.members.cache.filter(
          a => new Date().getTime() - a.joinedTimestamp < 604800000
        ).size
      }\` \n•   Son 1 Ayda Giren Üyeler \n \`${
        message.guild.members.cache.filter(
          a => new Date().getTime() - a.joinedTimestamp < 2629800000
        ).size
      }\`
    \n• Son 1 Yılda Giren Üyeler \n \`${
      message.guild.members.cache.filter(
        a => new Date().getTime() - a.joinedTimestamp < 31557600000
      ).size
    }\` 
    
    
    `
    )
    .addField(
      `Üyelerin Bağlandığı Cihazlar:`,
      `**${pc}** Kişi **__Bilgisayardan__**\n**${web}** Kişi **__Webden__**\n**${mobil}** Kişi İse **__Mobilden__** Bağlanıyor!`,
      false
    )

    .setTimestamp();

  const roller = new Discord.MessageEmbed().setColor("15f153").setDescription(
    `Tüm Roller: ` +
      message.guild.roles.cache
        .filter(r => r.name)
        .map(r => r)
        .join(", ")
  );

  const emojiler = new Discord.MessageEmbed()
    .setColor("15f153")
    .setDescription(
      `Tüm Emojiler:` +
        message.guild.emojis.cache.map(e => e.toString()).join(" ")
    );
  message.channel.send({ embed });
  message.channel.send(roller);
  message.channel.send(emojiler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-bilgi", "server"],
  permLevel: 0
};
exports.help = {
  name: "server-info",
  description: "server bilgi",
  usage: "server-info"
};
