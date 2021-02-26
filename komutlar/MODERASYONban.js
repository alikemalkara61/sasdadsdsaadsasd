exports.run = async (bot, message, args) => {
  const Discord = require("discord.js");
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.reply(
      new Discord.MessageEmbed().setDescription(
        `Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`
      )
    );
  message.delete();
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first();
  if (reason.length < 1)
    return message.reply("Ban sebebini yazmalısın.").then(m => m.delete(3000));
  if (message.mentions.users.size < 1)
    return message
      .reply("Kimi banlayacağını Etiketlemelisin")
      .catch(console.error)
      .then(m => m.delete(3000));
  if (!message.guild.member(user).bannable)
    return message.reply("Yetkilileri banlayamam.").then(m => m.delete(3000));

  message.guild.ban(user, 2);
  message.channel.send(
    `${user} kullanıcısının son 99 mesajını temizleyerek \`${reason}\` sebebi ile banladım!`
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban", "ban"],
  permlevel: 2
};
exports.help = {
  name: "soft-ban",
  description:
    "Belirttiğiniz kullanıcının önce mesajlarını siler sonra banlar.",
  usage: "softban <@kulanıcı>"
};
