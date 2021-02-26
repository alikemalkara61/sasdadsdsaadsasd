const { MessageEmbed } = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  let para = await db.fetch(`para_${message.author.id}`);
  if (!args[0]) {
    const sa = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("SİLO Bot")
      .setDescription(
        `Banka Üyeliği İçin ++üyelik-al banka Ücret:100 \n \n Oyun Üyeliği İçin ++üyelik-al oyun Ücret:35\n \n Market Üyeliği İçin ++üyelik-al market Ücret:100`
      )
      .setFooter(`SİLO BOT`);
    return message.channel.send(sa);
  }
  if (args[0] === "banka") {
    if (db.has(`banka_${message.author.id}`))
      return message.channel.send(
        new MessageEmbed().setDescription(
          "Banka Üyeliğiniz Hali Hazırda Bulunmaktadır."
        )
      );
    if (para < 35) {
      message.channel.send(
        new MessageEmbed().setDescription("Yeterli Paranız Bulunmamaktadır.")
      );
    } else {
      if (para > 35) {
        db.add(`para_${message.author.id}`, -35);
        db.set(`banka_${message.author.id}`, true);
        message.channel.send(
          new MessageEmbed().setDescription(
            `Banka Üyeliği Satın Alındı Hesabınızda Kalan Parayı Görmek İçin ++bakiye Yazınız.`
          )
        );
      }
    }
  }

  if (args[0] === "oyun") {
    if (db.has(`oyun_${message.author.id}`))
      return message.channel.send(
        new MessageEmbed().setDescription(
          "Oyun Üyeliğiniz Hali Hazırda Bulunmaktadır."
        )
      );
    if (para < 100) {
      message.channel.send(
        new MessageEmbed().setDescription("Yeterli Paranız Bulunmamaktadır.")
      );
    } else {
      if (para > 100) {
        db.add(`para_${message.author.id}`, -100);
        db.set(`oyun_${message.author.id}`, true);
        message.channel.send(
          new MessageEmbed().setDescription(
            `Oyun Üyeliği Satın Alındı Hesabınızda Kalan Parayı Görmek İçin ++bakiye Yazınız.`
          )
        );
      }
    }
  }

  if (args[0] === "market") {
    if (db.has(`market_${message.author.id}`))
      return message.channel.send(
        new MessageEmbed().setDescription(
          "Market Üyeliğiniz Hali Hazırda Bulunmaktadır."
        )
      );
    if (para < 100) {
      message.channel.send(
        new MessageEmbed().setDescription("Yeterli Paranız Bulunmamaktadır.")
      );
    } else {
      if (para > 100) {
        db.add(`para_${message.author.id}`, -100);
        db.set(`market_${message.author.id}`, true);
        message.channel.send(
          new MessageEmbed().setDescription(
            `Market Üyeliği Satın Alındı Hesabınızda Kalan Parayı Görmek İçin ++bakiye Yazınız.`
          )
        );
      }
    }
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["üyelik-al"],
  permLevel: 0
};

exports.help = {
  name: "ekonomiüyelik",
  description: "Botun davet linklerini gösterir.",
  usage: "davet"
};
