const Discord = require("discord.js");
const db = require("wio.db");
exports.run = async (client, m, args, level) => {
  let x = args[0];
  let embed = new Discord.MessageEmbed()
    .setColor("#FFD600")
    .setTimestamp()
    .setThumbnail(m.guild.iconURL({ dynamic: true, format: "png", size: 1024 }))
    .setTitle(`Hata`).setDescription(`
\`Bir Hediye Kodu Girmemişsin\`
`);
  let embed2 = new Discord.MessageEmbed()
    .setColor("#FFD600")
    .setTimestamp()
    .setThumbnail(m.guild.iconURL({ dynamic: true, format: "png", size: 1024 }))
    .setTitle(`Hata`).setDescription(`
\`Girdigin kod kullanılmış veya geçersiz\`
`);
  let embed3 = new Discord.MessageEmbed()
    .setColor("#FFD600")
    .setTimestamp()
    .setThumbnail(m.guild.iconURL({ dynamic: true, format: "png", size: 1024 }))
    .setTitle(`Başarılı`).setDescription(`
\`Başarılı Hediye Kodu Kullanıldı\`
`);

  if (!x) return m.channel.send(embed);
  let kod = await db.fetch(`kod.${x}`);

  if (!kod) return m.channel.send(embed2);
  db.add(`para_${m.author.id}`, kod);
  m.channel.send(embed3);
  db.delete(`kod.${x}`);
  
};
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ["kod-kullan"],
  permlevel: 0
};
exports.help = {
  name: "kod-kullan"
};
