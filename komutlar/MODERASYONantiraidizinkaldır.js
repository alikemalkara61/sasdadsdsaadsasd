const Discord = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  if (message.author.id !== message.guild.owner.id)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "Bu Komutu Kullanabilmek İçin Sunucu Sahibi  Olmanız Lazım"
      )
    );

  if (!db.fetch(`antiraidK_${message.guild.id}`)) return;

  if (!args[0]) {
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Bir Bot **ID**'Si Girmen Lazım`)
    );
    return;
  }

  if (!client.users.cache.has(args[0])) {
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Bu **ID**'ye Sahip Kişi Bulunamadı`)
    );
    return;
  }

  if (!client.users.cache.get(args[0]).bot) {
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          `Bu Kişi Bot Değildir Lütfen Geçerli Bir Bot **ID**'si Girmen Lazım`
        )
    );
    return;
  }

  message.channel.send(
    new Discord.MessageEmbed().setDescription(
      `Belirtilen Bota Sunucuya Giriş İzni İptal Edildi`
    )
  );

  db.delete(`botizin_${message.guild.id}.${args[0]}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bot-izni-kaldır", "botiznikaldır", "botiznikaldır"],
  permLevel: 0
};

exports.help = {
  name: "bot-iznikaldır"
};
