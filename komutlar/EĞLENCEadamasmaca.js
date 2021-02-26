const { stripIndents } = require("common-tags");
let oyndurum = new Set();
const db = require("wio.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let kelime = [
    "elma",
    "armut",
    "mahmut",
    "eşya",
    "sunucu",
    "ismail",
    "eşek",
    "silo",
    "siber",
    "kral",
    "bot",
    "yılbaşı",
    "köpek",
    "salata",
    "biber",
    "televizyon",
    "maymun",
    "aslan",
    "ali",
    "bali",
    "rusya",
    "ahmetiye"
  ];

  if (oyndurum.has(message.channel.id))
    return message.reply(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Kanal Başına Sadece bir Adam Asmaca Oyunu Meydana Gelebilir."
        )
    );

  try {
    const cevap = kelime[
      Math.floor(Math.random() * kelime.length)
    ].toLowerCase();
    let point = 0;
    let displayText = null;
    let tahmin = false;
    const confirmation = [];
    const yanlış = [];
    const display = new Array(cevap.length).fill("_");
    while (cevap.length !== confirmation.length && point < 6) {
      await message.channel.send(stripIndents`
                    ${
                      displayText === null
                        ? "**SİLO Adam Asmaca**!"
                        : displayText
                        ? "**Çok iyisin!**"
                        : "**Yanlış Harf!**"
                    }
                         **Kelime:**    \`${display.join(" ")}\`
                    **Yanlış Harfler:** ${yanlış.join(", ") || "Yok"}
                    \`\`\`
                    _________
                    |    |
                    |    ${point > 0 ? "" : ""}
                    |   ${point > 2 ? "┌" : " "}${point > 1 ? "()" : ""}${
        point > 3 ? "┐" : ""
      }
                    |    ${point > 4 ? "/" : ""} ${point > 5 ? "\\" : ""}
                    |
                    \`\`\`
                `);
      const filter = res => {
        const choice = res.content.toLowerCase();
        return (
          res.author.id === message.author.id &&
          !confirmation.includes(choice) &&
          !yanlış.includes(choice)
        );
      };
      const guess = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 300000
      });
      if (!guess.size) {
        await message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescripton("Zamanın doldu!")
        );
        break;
      }
      const choice = guess.first().content.toLowerCase();
      if (choice === "end") break;
      if (choice.length > 1 && choice === cevap) {
        tahmin = true;
        break;
      } else if (cevap.includes(choice)) {
        displayText = true;
        for (let i = 0; i < cevap.length; i++) {
          if (cevap.charAt(i) !== choice) continue;
          confirmation.push(cevap.charAt(i));
          display[i] = cevap.charAt(i);
        }
      } else {
        displayText = false;
        if (choice.length === 1) yanlış.push(choice);
        point++;
      }
    }
    oyndurum.delete(message.channel.id);
    if (cevap.length === confirmation.length || tahmin)
      return message.channel.send(
        new Discord.MessageEmbed().setDescripton(
          `**Tebrikler kelimeyi buldun! **${cevap}`
        )
      );
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescripton(`Maalesef bilemedin kelime bu: **${cevap}**`)
    );
  } catch (err) {
    oyndurum.delete(message.channel.id);
    return message.reply(
      new Discord.MessageEmbed().setDescripton(
        `Olamaz! Bir Hata Verdi: \`${err.message}\``
      )
    );
  }
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permlevel: 0
};

exports.help = {
  name: "adamasmaca",
  description: "Adam asmaca oynarsınız.",
  usage: "adamasmaca"
};
