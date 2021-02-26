const Discord = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2MTYzODk3NTU0MTYwODQ1MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA1Nzg5OTM3fQ.y7G-j9B0VHwHjrdUJ4SZZFvrTRh2zsNwCvc-tXVGMNM",
    client
  );
  const guld = db.fetch(`gold_${message.author.id}`);
  if (guld === true) {
    const user = message.mentions.users.first() || message.author;
    if (user) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${user.tag} adlı kullanıcının avatarı:`)
        .setImage(user.displayAvatarURL({ dynamic: true }))
        .setColor("GOLD")
        .setFooter(`SİLO Bot | Gold Üye Tarafından Kullanıldı`);
      message.channel.send(embed);
    } else {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag}  Adlı Kullanıcının Avatarı:`,
          message.author.avatarURL
        )
        .setImage(message.author.avatarURL({ dynamic: true }))
        .setColor("GOLD")
        .setFooter(`SİLO Bot | Gold Üye Tarafından Kullanıldı`);
      message.channel.send(embed);
    }
  } else {
    dbl.hasVoted(message.author.id).then(voted => {
      if (voted) {
        let user = message.mentions.users.first() || message.author;
        if (user) {
          const embed = new Discord.MessageEmbed()
            .setAuthor(`${user.tag} adlı kullanıcının avatarı:`)
            .setImage(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(`SİLO Bot`);
          message.channel.send(embed);
        } else {
          const embed = new Discord.MessageEmbed()
            .setAuthor(
              `${message.author.tag}  Adlı Kullanıcının Avatarı:`,
              message.author.avatarURL
            )
            .setImage(message.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(`SİLO Bot`);
          message.channel.send(embed); //https://paste.ee/p/caXHS
        }
      } else {
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              "[[Oy Ver](https://top.gg/bot/761638975541608450/vote)] Oy Verdikten Sonra Tekrar Deneyin."
            )
        );
      }
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["avatar", "avatarım"],
  permLevel: 0
};

exports.help = {
  name: "pp"
};
