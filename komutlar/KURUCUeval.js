const Discord = require("discord.js");
const db = require("wio.db");
const moment = require("moment");
exports.run = async (client, message, args, color, prefix) => {
  if (message.author.id !== "727108703299436614")
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Bu Komutu Kullanabilmek İçin `727108703299436614` Kimliğine Sahip Olmanız Lazım"
        )
    );
  try {
    let codein = args.join(" ");
    let code = eval(codein);

    if (codein.length < 1)
      return message.reply(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription("Bir KOD Gir.")
      );

    if (typeof code !== "string")
      code = require("util").inspect(code, { depth: 0 });
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .addField("» Kod", `\`\`\`js\n${codein}\`\`\``)
      .addField("» Sonuç", `\`\`\`js\n${code}\n\`\`\``);
    message.channel.send(embed);
  } catch (e) {
    let embed2 = new Discord.MessageEmbed()
      .setColor("RED")
      .addField("» Hata", "```js\n" + e + "\n```");
    message.channel.send(embed2);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["eval"],
  permLevel: 0
};

exports.help = {
  name: "eval",
  description: "Kod denemeyi sağlar.",
  usage: "-eval"
};
