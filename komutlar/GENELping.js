const Discord = require("discord.js");

const db = require("wio.db");

exports.run = async (app, message, client) => {
  const embed2 = new Discord.MessageEmbed().setDescription(
    "**Botun pingi hesaplanıyor**"
  );

  let start = Date.now();
  let pingcağız = app.ws.ping;
  let mesaj = await message.channel.send(embed2);
  let diff = Date.now() - start;

  let APIU = app.ping;

  setInterval(() => {
    const embed = new Discord.MessageEmbed().setDescription(
      `**SİLO Bot**\nApi gecikme süresi; **${pingcağız}ms** \n\n**SİLO bot**\nBot gecikme süresi; **${pingcağız}ms**`
    );

    mesaj.edit(embed);
  }, 5000);
};
exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: ["ping"],

  permLevel: 0
};

exports.help = {
  name: "ping",

  description: "İstediğiniz şeyi bota yazdırır.",

  usage: "yaz [yazdırmak istediğiniz şey]"
};
