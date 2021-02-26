const Discord = require("discord.js");
const db = require("wio.db");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Bu Komutu Kullanmak İçin `MANAGE_MESSAGES` Yetkisine Sahip Olman Lazım"
      )
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
  var x = args.slice(0).join(" ");

  if (!x)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Kaç Mesaj Silmem Lazım")
    );
  if (isNaN(x))
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("Sadece Yazı Gir")
    );

  let fetched = await message.channel.messages.fetch({ limit: args[0] });

  message.channel
    .bulkDelete(fetched)

    .catch(error =>
      message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "14 Günden Önce Yazılmış Mesajları Discord APİ Silmeme İzin Vermemektedir."
        )
      )
    );

  message.channel
    .send(
      new Discord.MessageEmbed().setDescription(
        `${args[0]} Adet mesaj silindi!`
      )
    )
    .then(msg => msg.delete({ timeout: 8000, reason: "mesaj silme" }));
  message.delete();
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil"],
  permLevel: 0
};
exports.help = {
  name: "temizle"
};
