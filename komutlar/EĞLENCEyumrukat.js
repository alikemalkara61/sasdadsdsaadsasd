const Discord = require("discord.js");
const db = require("wio.db");

exports.run = function(client, message, args) {
  const DBL = require("dblapi.js");
  const dbl = new DBL(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2MTYzODk3NTU0MTYwODQ1MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA1Nzg5OTM3fQ.y7G-j9B0VHwHjrdUJ4SZZFvrTRh2zsNwCvc-tXVGMNM",
    client
  );

  const guld = db.fetch(`gold_${message.author.id}`);
  if (guld === true) {
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1)
      return message
        .reply(
          new Discord.MessageEmbed().setDescription("Kime Yumruk Atacaksın ?")
        )
        .catch(console.error);

    const embed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setDescription(
        message.author.username + ` ${user}` + "** adlı kişiyi, Yumrukladı **"
      )
      .setImage(
        "https://media1.tenor.com/images/c7dece5cdd4cee237e232e0c5d955042/tenor.gif?itemid=4902914"
      )
      .setFooter(
        `${message.author.username} Adlı Gold Üye Tarafından Yumruk Atıldı`,
        message.author.avatarURL({ dynamic: true })
      );
    return message.channel.send(embed);
  } else {
    dbl.hasVoted(message.author.id).then(voted => {
      if (voted) {
        let user = message.mentions.users.first();

        if (message.mentions.users.size < 1)
          return message
            .reply(
              new Discord.MessageEmbed().setDescription(
                "Kime Yumruk Atacaksın?"
              )
            )
            .catch(console.error);

        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            message.author.username +
              ` ${user}` +
              "** adlı kişiyi, Yumrukladı **"
          )
          .setImage(
            "https://media1.tenor.com/images/c7dece5cdd4cee237e232e0c5d955042/tenor.gif?itemid=4902914"
          )
          .setFooter(
            `${message.author.username} Tarafından Yumruk Atıldı`,
            message.author.avatarURL({ dynamic: true })
          );
        return message.channel.send(embed);
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
  guildOnly: true,
  aliases: ["yumrukla"],
  permLevel: 0
};

exports.help = {
  name: "yumruk-at"
};
