  const Discord = require("discord.js");
const db = require("wio.db");
exports.run = async (client, message, args, level) => {

  const embed = new Discord.MessageEmbed()
    .setTitle("SİLO - Komut Sayısı")
    .setDescription(
      "**\n SİLO BOT | Toplam**  **`" +
        client.commands.size +
        "`** **Komut Bulunmakta!**"
    )

    .setColor("GREEN")
    .setTimestamp();

  return message.channel.send(embed);
};

exports.conf = {
  name: true,
  guildonly: false,
  aliases: ["kaç-komut"],
  permlevel: 0
};
exports.help = {
  name: "kaç-komut"
};
