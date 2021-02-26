const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    
    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Bu Komutu Uygulamak İçin `BAN_MEMBERS` Yetkisine Sahip Olman Lazım"
      )
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }

  const sayı = args[1];
  const sayac_kanal = message.mentions.channels.first();
  if (!sayı || !sayac_kanal)
    return message.reply(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          `**Sayaç Sistemini Ayarlamak İçin Lütfen Sayı ve Kanal Belirtiniz** **Örnek** : \`${prefix}sayaç #kanal 100\``
        )
    );
  if (isNaN(sayı))
    return message.reply(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          `**Sayaç Sistemini Ayarlamak İçin Sayıyı Sadece Rakamlardan Yazmalısın**`
        )
    );

  await db.set(`SayaçSayı_${message.guild.id}`, sayı);
  await db.set(`SayaçKanal_${message.guild.id}`, sayac_kanal.id);

  message.reply(
    new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Sayaç Başarıyla Ayarlandı!`)
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sayaç"],
  permLevel: 0
};
exports.help = {
  name: "sayaç"
};
