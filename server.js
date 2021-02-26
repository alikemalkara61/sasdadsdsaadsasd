const Discord = require('discord.js');
var express = require('express');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const Jimp = require('jimp');
const ms = require('ms');
const fs = require('fs');
const canvas = require('canvas');
const momenttimezone = require('moment-timezone')
const db = require('quick.db');
const YouTube = require('simple-youtube-api');
const superagent = require("superagent");
const { promisify } = require('util')
const chalk = require('chalk');
const weather = require('weather-js')
const moment = require('moment');
require('./util/eventLoader')(client)
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMTY3NjM5MzQzMjc0MzkzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1NDA5ODYzfQ.UBd4sYZIn0IqfXUV2gdDkyeBBooh_5dWnacHEhWzDOw', client);
//TEŞEKKUR EDİN BARİ
dbl.on('posted', () => {
  console.log('[-] BOT: Server kısmını ayarladım !');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

const log = message => {
  console.log(`${message}`);
};

client.on('ready', () => {
  console.log(``);
});


  client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

const embed = new Discord.MessageEmbed()

  .addField(
    `SİLO BOT - Teşekkürler`,
    `Selamlar, Ben TechnoAli(SİLO Botun Sahibi) Öncelikle Botumu Eklediğiniz İçin Teşekkür Ederim.`
  )
  .addField(
    `SİLO BOT - Prefix(Ön Ek)`,
    `SİLO Botun Prefixi(ön eki) = \`++\`(2x Artı)'dir.`
  )
  .addField(
    `SİLO BOT - Nasıl Kullanılır`,
    `SİLO Botun Tüm Özelliklerinden Yararlanabilmek için Sadece \`++yardım\` Yazmanız Gerekmektedir.`
  )
  .addField(
    `SİLO BOT - Linkler`,
    `Destek Sunucumuz:\n [DESTEK SUNUCUSU](https://discord.gg/CZSyTWnhs9)`
  )
  .setFooter(`SİLO BOT © 2020`)
  .setTimestamp();

client.on("guildCreate", guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });

  defaultChannel.send(embed);
});

//-------------------------REKLAM ENGEL---------------------------//
client.on("message", async message => {
  let wictor = await db.fetch(`reklam_${message.guild.id}`);
  if (wictor) return;
  if (!message.guild) return;
  let linkler = require("./linkler.json");
  let kelimeler = message.content.slice(" ").split(/ +/g);
  if (linkler.some(kufur => kelimeler.some(kelime => kelime === kufur))) {
    if (message.member.hasPermission("BAN_MEMBERS")) return;
    message.delete();
    message.channel
      .send(
        new Discord.MessageEmbed().setDescription(
          `Hey ${message.author} Bu Sunucuda Reklam Filtresi Açık`
        )
      )
      .then(x => x.delete({ timeout: 6000 }));
  }
});
client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let wictor = await db.fetch(`kufurengel.${nev.guild.id}`, "true");
    if (!wictor) return;
    if (!nev.guild) return;
    let küfürler = require("./linkler.json");
    let kelimeler = nev.content.slice(" ").split(/ +/g);
    if (küfürler.some(kufur => kelimeler.some(kelime => kelime === kufur))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return;
      nev.delete();
      nev.channel
        .send(
          new Discord.MessageEmbed().setDescription(
            `Hey ${nev.author} Mesajlarını Editleyerek Reklam Yapabileceğinimi Sandın.`
          )
        )
        .then(x => x.delete({ timeout: 6000 }));
    }
  }
});
//----------------------KÜFÜR ENGEL----------------------------//
client.on("message", async message => {
  let wictor = await db.fetch(`kufurengel.${message.guild.id}`);
  if (!wictor) return;
  if (!message.guild) return;
  let küfürler = require("./küfürler.json");
  let kelimeler = message.content.slice(" ").split(/ +/g);
  if (küfürler.some(kufur => kelimeler.some(kelime => kelime === kufur))) {
    if (message.member.hasPermission("BAN_MEMBERS")) return;
    message.delete();
    message.channel
      .send(
        new Discord.MessageEmbed().setDescription(
          `Hey ${message.author} Bu Sunucuda Küfür Filtresi Açık`
        )
      )
      .then(x => x.delete({ timeout: 6000 }));
  }
});
client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let wictor = await db.fetch(`kufurengel.${nev.guild.id}`);
    if (!wictor) return;
    if (!nev.guild) return;
    let küfürler = require("./küfürler.json");
    let kelimeler = nev.content.slice(" ").split(/ +/g);
    if (küfürler.some(kufur => kelimeler.some(kelime => kelime === kufur))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return;
      nev.delete();
      nev.channel
        .send(
          new Discord.MessageEmbed().setDescription(
            `Hey ${nev.author} Mesajlarını Editleyerek Küfür Edebileceğinimi Sandın.`
          )
        )
        .then(x => x.delete({ timeout: 6000 }));
    }
  }
});
//-----------KENDİNİ SAĞILAŞTIRMA------------//
client.on("voiceStateUpdate", async (___, newState) => {
  if (
    newState.member.user.bot &&
    newState.channelID &&
    newState.member.user.id == client.user.id &&
    !newState.selfDeaf
  ) {
    newState.setSelfDeaf(true);
  }
});
//mesaj
client.on("ready", () => {
  setInterval(function() {
    let channel = client.channels.cache.get("");
    if (channel) {
      channel.send("Şuanki Pingim" + client.ws.ping);
    }
  }, 60000);
});

//sshshshshshsh

client.on("message", async msg => {
  if (msg.author.id === "292311926036234240") {
    msg.react("768739840358875158");
  }
});
//------çekiliş-------//
client.on("ready", async () => {
  const db = require("quick.db");
  function destructMS(milli) {
    if (isNaN(milli) || milli < 0) {
      return null;
    }

    var d, h, m, s;
    s = Math.floor(milli / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    var yazi;
    if (d !== 0) yazi = `${d} gün`;
    if (h !== 0 && yazi) yazi = yazi + `, ${h} saat`;
    if (h !== 0 && !yazi) yazi = `${h} saat`;
    if (m !== 0 && yazi) yazi = yazi + `, ${m} dakika`;
    if (m !== 0 && !yazi) yazi = `${m} dakika`;
    if (s !== 0 && yazi) yazi = yazi + `, ${s} saniye`;
    if (s !== 0 && !yazi) yazi = `${s} saniye`;
    if (yazi) return yazi;
    if (!yazi) return `1 saniye`;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function cekme(message, array) {
    var eskikazananlar = db.fetch(`cekilis_${message.id}.kazananlar`) || [];
    var cekilenkisi = array[Math.floor(Math.random() * array.length)];
    if (!client.users.cache.get(cekilenkisi.id)) {
      return cekme(message, array);
    }
    while (eskikazananlar.includes(cekilenkisi.id)) {
      return cekme(message, array);
    }
    if (!eskikazananlar.includes(cekilenkisi.id)) {
      if (db.has(`cekilis_${message.id}.kazananlar`)) {
        db.push(`cekilis_${message.id}.kazananlar`, cekilenkisi.id);
      } else {
        db.set(`cekilis_${message.id}.kazananlar`, [cekilenkisi.id]);
      }
    }
  }

  let dasall = db.all().filter(i => i.ID.startsWith("cekilis_"));
  for (const ii of dasall) {
    const channel = client.channels.cache.get(db.fetch(`${ii.ID}.mesaj.kanal`));
    const mesaj = db.fetch(`${ii.ID}.mesaj.id`);
    const bitecegizamanms = db.fetch(`${ii.ID}.bitecek`);
    const kazanacak = db.fetch(`${ii.ID}.kazanacak`);
    const verilecek = db.fetch(`${ii.ID}.verilecek`);
    const cekilisid = db.fetch(`${ii.ID}.cekilisid`);
    let embed = new Discord.MessageEmbed()
      .setAuthor("🎉 Çekiliş 🎉")
      .setTitle("**" + verilecek + "**")
      .setDescription(
        `Aşağıdaki 🎉 emojisine tıklayarak çekilişe katılabilirsiniz!\n**Kalan süre:** Bekleniyor...`
      )
      .setFooter(`${kazanacak} kazanan | ID: ${cekilisid} | Bitecek:`)
      .setTimestamp(bitecegizamanms)
      .setColor("#2F3136");
    if (channel) {
      channel.messages.fetch(mesaj).then(async msg => {
        msg.edit(embed);
        const reaction = msg.reactions.cache.first();
        const intervaley = setInterval(async function() {
          if (!db.has(ii.ID)) return clearInterval(intervaley);
          const kalanzaman = bitecegizamanms - Date.now();
          if (kalanzaman <= 0) {
            embed.setDescription(`Çekiliyor...`);
            msg.edit(embed);
            clearInterval(intervaley);
            reaction.users.fetch().then(async kasiler => {
              const gercekkisisayisi = kasiler.size - 1;
              if (gercekkisisayisi < kazanacak) {
                let embed = new Discord.MessageEmbed()
                  .setAuthor("🎉 Çekiliş Bitti 🎉")
                  .setTitle("**" + verilecek + "**")
                  .setDescription(
                    `Yeterli katılım olmadığından kazanan seçilemedi.`
                  )
                  .setFooter(`${kazanacak} kazanan | ID: ${cekilisid} | Bitti:`)
                  .setTimestamp(bitecegizamanms)
                  .setColor("#2F3136");
                msg.edit(embed);
                msg.reactions.removeAll();
                db.delete(`cekilis_${msg.id}`);
                let thall = db.all().filter(i => i.ID.includes(msg.id));
                for (const uu of thall) {
                  db.delete(uu.ID);
                }
              } else {
                var array = reaction.users.cache.array();
                var ukuk;
                for (ukuk = 0; ukuk < kazanacak; ukuk++) {
                  cekme(msg, array);
                }
                await sleep(50);
                let kazananherkes = db.fetch(`cekilis_${msg.id}.kazananlar`);
                let embed = new Discord.MessageEmbed()
                  .setAuthor("🎉 Çekiliş Bitti 🎉")
                  .setTitle("**" + verilecek + "**")
                  .setDescription(
                    `**Kazananlar:** <@${kazananherkes.join(">, <@")}>`
                  )
                  .setFooter(`${kazanacak} kazanan | ID: ${cekilisid} | Bitti:`)
                  .setTimestamp(bitecegizamanms)
                  .setColor("#2F3136");
                msg.edit(embed);
                msg.channel.send(
                  `**Tebrikler** <@${kazananherkes.join(
                    ">, <@"
                  )}>! **\`${verilecek}\` çekilişini kazandınız!**`
                );
                db.set(`cekilisidsi_${cekilisid}.kazananlar`, kazananherkes);
                db.delete(`cekilis_${msg.id}`);
                let theall = db.all().filter(i => i.ID.includes(msg.id));
                for (const ua of theall) {
                  db.delete(ua.ID);
                }
              }
            });
          } else {
            const kalanzamanyazi = destructMS(kalanzaman);
            embed.setDescription(
              `Aşağıdaki 🎉 emojisine tıklayarak çekilişe katılabilirsiniz!\n**Kalan süre:** ${kalanzamanyazi}`
            );
            msg.edit(embed);
          }
        }, 5000);
      });
    }
  }
});

client.on("ready", () => require("quick.db").set("start", Date.now()));
//--------------------------------OYNUYOR------------------------//
client.on("ready", async () => {
  var oynuyorkısımları = [`Prefix: ++`, "++yardım"];

  setInterval(function() {
    var random = Math.floor(
      Math.random() * (oynuyorkısımları.length - 0 + 1) + 0
    );
    client.user.setActivity(oynuyorkısımları[random], { type: "LISTENING" });
  }, 2 * 6000);
});

//---------------------------------TEL-------------------------------------//
//const Constants = require("discord.js/src/util/Constants.js");

//Constants.DefaultOptions.ws.properties.$browser = "Discord iOS";

//-------------------------ANTİ-RAİD---------------------------//
client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`antiraidK_${member.guild.id}`);
  if (!kanal) return;
  const gözelkanal = client.channels.cache.get(kanal);
  if (!gözelkanal) return;
  if (member.user.bot == true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      gözelkanal.send(
        new Discord.Mesaage.Embed().setDescription(
          "**<@" +
            member.id +
            ">** Adlı Bota Yetki Verilmiştir Bilginize Sunucuya Katılım İznini Kaldırmak İçin **++bot-izni-kaldır botunid**"
        )
      );
    } else {
      gözelkanal.send(
        new Discord.MessageEmbed().setDescription(
          "**<@" +
            member.id +
            "> ** adlı botu güvenlik amacı ile uzaklaştırdım. Tekrar geldiğinde uzaklaştırılmasını istemiyorsanız **++bot-izni-ver botunid**"
        )
      );
      member.kick();
    }
  }
});
//-------------------------------HG-BB---------------------------------------//

client.on("guildMemberAdd", async member => {
  const ch = await db.fetch(`hgbbKanal_${member.guild.id}`);
  const guld = db.fetch(`gold_${member.user.id}`);

  if (!ch || ch == null) return;
  const kanal = member.guild.channels.cache.get(ch);
  if (!kanal) return;

  const hgbbembed1 = new Discord.MessageEmbed();
  hgbbembed1.setTitle("SİLO BOT");
  hgbbembed1.setDescription(
    `\`${member.user.username}\` Adlı Kullanıcı Sunucuya Giriş Yaptı `
  );
  hgbbembed1.setColor("GREEN");
  return;
  kanal.send(hgbbembed1);
});
client.on("guildMemberRemove", async member => {
  const ch = await db.fetch(`hgbbKanal_${member.guild.id}`);
  const guld = db.fetch(`gold_${member.user.id}`);
  const hgbbembed1gold = new Discord.MessageEmbed();

  if (!ch || ch == null) return;
  const kanal = member.guild.channels.cache.get(ch);
  if (!kanal) return;

  if (guld === "gold") {
    hgbbembed1gold.setTitle("SİLO BOT");
    hgbbembed1gold.setDescription(
      ` <a:CoolDance:776369152171442177> \`${member.user.username}\` Adlı Gold Üye Sunucudan Ayrıldı `
    );
    hgbbembed1gold.setColor("GOLD");
    return kanal.send(hgbbembed1gold);
  } else {
    const hgbbembed1 = new Discord.MessageEmbed();
    hgbbembed1.setTitle("SİLO BOT");
    hgbbembed1.setDescription(
      `\`${member.user.username}\` Adlı Kullanıcı Sunucudan Çıkış Yaptı `
    );
    hgbbembed1.setColor("RED");
    kanal.send(hgbbembed1);
  }
});
//-------------------------------------GOLD-------------------//
client.on("message", async message => {
  const request = require("node-superfetch");
  const db = require("wio.db");
  const ms2 = require("parse-ms");
  let timeout = ms("10m");
  let dakdest = ms("1m");
  let i = db.fetch(`gold_.${message.author.id}`);
  if (db.has(`gold_.${message.author.id}`) == true) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
      let time = ms2(timeout - (Date.now() - dakdest));
    } else {
      if (message.author.bot) return;
      if (message.content.length > 20) {
        var embed = new Discord.MessageEmbed()
          .setAuthor(`SİLO GOLD`, `${message.author.avatarURL()}`)
          .setDescription(
            `<a:CoolDance:776369152171442177> Hizzaya Geçin! Burada Bir Gold Üye Belirdi! <@${message.author.id}>`
          )
          .setColor("GOLD");
        message.channel.send(embed).then(message => {
          message.delete({ timeout: 4000 });
        });
      }
    }
  } else if (i == undefined) {
  }
  if (!i) return;
});
//------------------------OTOROL---------------------------//
client.on("guildMemberAdd", async member => {
  const guld = db.fetch(`gold_${member.user.id}`);
  let kanal = db.fetch(`otorolkanal_${member.guild.id}`);
  let rol = db.fetch(`otorolrol_${member.guild.id}`);
  let mesaj = db.fetch(`otorolmesaj_${member.guild.id}`);
  let hgmsj = await db.fetch(`otorolhgmsj_${member.guild.id}`);
  const otorol = new Discord.MessageEmbed();
  //https://paste.ee/p/aK8ad
  if (!kanal) return;
  member.roles.add(rol);
  const kanal2 = member.guild.channels.cache.get(kanal);
  if (guld === "gold") {
    otorol.setTitle("SİLO BOT");
    otorol.setColor("GOLD");
    otorol.setDescription(
      member.user.username +
        " Adlı Gold Üye Otomatik Rolün Verildi Seninle Beraber `" +
        member.guild.memberCount +
        "` Kişiyiz"
    );
  } else {
    otorol.setTitle("SİLO BOT");
    otorol.setDescription(
      member.user.username +
        " Adlı  Üye Otomatik Rolün Verildi Seninle Beraber `" +
        member.guild.memberCount +
        "` Kişiyiz"
    );
    otorol.setColor("GREEN");
    kanal2.send(otorol);
  }
});
//---------------------------eklendim-atıldım------------------------------//
client.on("guildCreate", async guild => {
  guild.channels.cache
    .filter(t => t.type === "text")
    .random()
    .createInvite({ maxAge: 0, reason: "Otomatik Link Oluşturma" })
    .then(link => {
      let embed = new Discord.MessageEmbed();
      var botOwnerID = "727108703299436614";
      var guildOwner = guild.owner.user;
      var guildOwnerTag = guild.owner.user.tag;
      var guildName = guild.name;
      var guildMemberCount = guild.memberCount;

      embed.setTitle(`Holey new sunucu geldi`);
      embed.addField("Sunucu adı", guildName);
      embed.addField("Sunucu üye sayısı", guildMemberCount);
      embed.addField(`Sunucu sahibi`, guildOwnerTag);
      embed.addField(`Botun Sunucu Sayısı`, `${client.guilds.cache.size}`);
      embed.addField(`Botun Kişi Sayısı`, `${client.users.cache.size}`);
      embed.setColor("GOLD");
      embed.setFooter(guildName, guild.iconURL);
      embed.setThumbnail(guild.iconURL);
      embed.addField("Davet Link", link);
      client.users.cache.get(botOwnerID).send(embed);
    });
});
client.on("guildDelete", async guild => {
  var botOwnerID = "727108703299436614";
  var guildOwner = guild.owner.user;
  var guildOwnerTag = guild.owner.user.tag;
  var guildName = guild.name;
  var guildMemberCount = guild.memberCount;
  let embed = new Discord.MessageEmbed();

  embed.setTitle("Bot Atıldı");
  embed.addField("Sunucu adı", guildName);
  embed.addField("Sunucu üye sayısı", guildMemberCount);
  embed.addField(`Sunucu sahibi`, guildOwnerTag);
  embed.addField(`Botun Sunucu Sayısı`, `${client.guilds.cache.size}`);
  embed.addField(`Botun Kişi Sayısı`, `${client.users.cache.size}`);

  embed.setColor("RED");
  embed.setFooter(guildName, guild.iconURL);
  embed.setThumbnail(guild.iconURL);

  client.users.cache.get(botOwnerID).send(embed);
});
//----------------------SAYAC-------------------------//
client.on("guildMemberAdd", async member => {
  let sayı = await db.fetch(`SayaçSayı_${member.guild.id}`);
  let kanal = await db.fetch(`SayaçKanal_${member.guild.id}`);
  const guld = db.fetch(`pre.${member.user.id}`);
  if (!sayı || !kanal) return;
  let sonuç = sayı - member.guild.memberCount;

  if (guld === "gold") {
    return client.channels.cache
      .get(kanal)
      .send(
        new Discord.MessageEmbed()
          .setColor("GOLD")
          .setDescription(
            `✅ \`${member.user.username}\` Adlı Gold Üye Aramıza Katıldı **${sayı}** Kişiye Ulaşmak için **${sonuç}** Kişi Kaldı`
          )
      );
  } else {
    client.channels.cache
      .get(kanal)
      .send(
        new Discord.MessageEmbed().setDescription(
          `✅ \`${member.user.username}\` Katıldı **${sayı}** Kişiye Ulaşmak için **${sonuç}** Kişi Kaldı`
        )
      );
  }
});

client.on("guildMemberRemove", async member => {
  let sayı = await db.fetch(`SayaçSayı_${member.guild.id}`);
  let kanal = await db.fetch(`SayaçKanal_${member.guild.id}`);
  const guld = db.fetch(`pre.${member.user.id}`);
  if (!sayı || !kanal) return;
  let sonuç = sayı - member.guild.memberCount;

  if (guld === "gold") {
    return client.channels.cache
      .get(kanal)
      .send(
        new Discord.MessageEmbed()
          .setColor("GOLD")
          .setDescription(
            ` ⛔️ \`${member.user.username}\` Adlı Gold Üye Ayrıldı **${sayı}** Kişiye Ulaşmak İçin **${sonuç}** Kişi Kaldı`
          )
      );
  } else {
    client.channels.cache
      .get(kanal)
      .send(
        new Discord.MessageEmbed().setDescription(
          ` ⛔️ \`${member.user.username}\` Ayrıldı **${sayı}** Kişiye Ulaşmak İçin **${sonuç}** Kişi Kaldı`
        )
      );
  }
});

////--------------BOTA DM ATANLAR BAŞLANGIÇ-------------////

client.on("message", msg => {
  var owner = "727108703299436614";
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("RANDOM")
      .setThumbnail(`${msg.author.avatarURL()}`)
      .addField("Gönderen", msg.author.tag)
      .addField("Gönderen ID", msg.author.id)
      .addField("Gönderilen Mesaj", msg.content);

    client.users.cache.get(owner).send(botdm);
  }
  if (msg.channel.bot) return;
});

//-------------ETİKET PREFİX-----------//
client.on("message", message => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || "++";
  const etiket = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`Prefixim: ${prefix}\n Yardım için: ${prefix}yardım`);
  if (
    message.content.includes(`<@${client.user.id}>`) ||
    message.content.includes(`<@!${client.user.id}>`)
  ) {
    message.channel.send(etiket);
  }
});
//--------------MODLOG---------------//
client.on("messageDelete", async message => {
  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(
    await db.fetch(`log_${message.guild.id}`)
  );

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "");

  log.send(embed);
});

client.on("channelCreate", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());

  let kanal;

  if (channel.type === "text") kanal = `<#${channel.id}>`;

  if (channel.type === "voice") kanal = `\`${channel.name}\``;

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal**", `${kanal}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconUR);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelDelete", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleCreate", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Rol Oluşturma")

    .addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor("RANDOM")

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleDelete", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Rol Silme")

    .addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor("RANDOM")

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiCreate", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Emoji Oluşturma")

    .addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiDelete", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Emoji Silme")

    .addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen emoji**", `${emoji}`)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setColor("RANDOM")

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

  if (!modlog) return;

  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Emoji Güncelleme")

    .addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

    .addField(
      "**Güncellenmeden önceki emoji**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )

    .addField(
      "**Güncellendikten sonraki emoji**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL({ dynamic: true })
    )

    .setThumbnail(oldEmoji.guild.iconURL({ dynamic: true }));

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Yasaklama")

    .addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

    .addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

    .addField("**Yasaklanma sebebi**", `${entry.reason}` || "yok")

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL({ dynamic: true }));

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Yasak kaldırma")

    .addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

    .addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${guild.name} - ${guild.id}`,
      guild.iconURL({ dynamic: true })
    )

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

//-----------------------------------------reach role
client.on("messageReactionAdd", async (reaction, user) => {
  let message = reaction.message;
  let tepki = await db.fetch(`react_${message.guild.id}`);
  if (tepki) {
    tepki.forEach(i => {
      if (reaction.emoji.name !== i.emoji) return;
      if (message.channel.id !== i.kanal) return;
      if (message.id !== i.mesaj) return;

      message.guild.members.cache.get(user.id).roles.add(i.role);
    });
  }
});
client.on("messageReactionRemove", async (reaction, user) => {
  let message = reaction.message;
  let tepki = await db.fetch(`react_${message.guild.id}`);
  if (tepki) {
    tepki.forEach(i => {
      console.log(i);
      if (reaction.emoji.name !== i.emoji) return;
      if (message.channel.id !== i.kanal) return;
      if (message.id !== i.mesaj) return;

      message.guild.members.cache.get(user.id).roles.remove(i.role);
    });
  }
});
//--------------------OTOTAG VE İSİM-------------//
client.on("guildMemberAdd", async member => {
  let tag = db.fetch(`ototag_${member.guild.id}`);
  let otoisim = db.fetch(`otoisim_${member.guild.id}`);
  let tagteyit = db.fetch(`ototag_${member.guild.id}`);

  if (otoisim)
    member.guild.members.cache.get(member.id).setNickname(`${otoisim}`);
  if (tag)
    member.guild.members.cache
      .get(member.id)
      .setNickname(`${tag} | ${member.user.username}`);
});
//-------------------sa-as
client.on("message", message => {
  if (db.fetch(`sa-as_${message.guild.id}`)) {
    if (message.author.bot || !message.guild) return;
    const bekleaq = new Discord.MessageEmbed()
      .setAuthor("SİLO BOT")
      .setColor("GREEN")
      .setDescription(`Aleyküm Selam, ${message.author}`)
      .setFooter("SİLO BOT");

    if (
      ["sa", "selam", "selamın aleyküm"].some(
        msg => message.content.toLowerCase() == msg
      )
    ) {
      return message.channel.send(bekleaq);
    }
  }
});

//--------------yazırol
client.on("message", msg => {
  let prefix = db.fetch(`prefix_${msg.guild.id}`) || ayarlar.prefix;
  if (!msg.guild) return;
  const data = db.fetch(`yazı_${msg.guild.id}`);
  if (data == null) return;
  let map = [];
  var x = data;

  for (var i in x) {
    if (`${prefix}` + x[i].mesaj == msg.content) {
      const rolId = x[i].rol;
      const rol = msg.guild.roles.cache.get(rolId);
      msg.member.roles.add(rol);
      const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`${rol} Adlı Rolü Başarıyla Aldın.`);
      msg.channel.send(embed);
    }
  }
});
client.on("message", message => {
  if (message.author.id == "727108703299436614") return;
  if (message.content === "!spam") {
    message.channel.send("SPAM ATMA ATMA SENİN YAZIK KAFANA TAMAM MI");
  }
});
//davet
/*
const Database = require("./Helpers/Database");

//#region Invite Manager
const Invites = new Discord.Collection();

client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild
      .fetchInvites()
      .then(_invites => {
        Invites.set(guild.id, _invites);
      })
      .catch(err => {});
  });
});
client.on("inviteCreate", invite => {
  var gi = Invites.get(invite.guild.id);
  gi.set(invite.code, invite);
  Invites.set(invite.guild.id, gi);
});
client.on("inviteDelete", invite => {
  var gi = Invites.get(invite.guild.id);
  gi.delete(invite.code);
  Invites.set(invite.guild.id, gi);
});
//#endregion

//#region Continuity

client.on("guildCreate", guild => {
  guild
    .fetchInvites()
    .then(invites => {
      Invites.set(guild.id, invites);
    })
    .catch(e => {});
});
*/
//#endregion

//#region Counter
/*client.on("guildMemberAdd", member => {
  //const gi = new Collection().concat(Invites.get(member.guild.id));
  const db = new Database("./Servers/" + member.guild.id, "Invites"),
    gi = (Invites.get(member.guild.id) || new Discord.Collection()).clone(),
    settings =
      new Database("./Servers/" + member.guild.id, "Settings").get(
        "settings"
      ) || {};
  var guild = member.guild,
    fake =
      (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3
        ? true
        : false,
    channel = guild.channels.cache.get(settings.Channel);
  guild
    .fetchInvites()
    .then(invites => {
      // var invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).maxUses != 1 && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode;
      var invite =
        invites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) ||
        gi.find(_i => !invites.has(_i.code)) ||
        guild.vanityURLCode;
      Invites.set(member.guild.id, invites);
      var content = `${member} is joined the server.`,
        total = 0,
        regular = 0,
        _fake = 0,
        bonus = 0;
      if (invite == guild.vanityURLCode)
        content = settings.defaultMessage
          ? settings.defaultMessage
          : `-member- is joined the server! But don't know that invitation he came up with. :tada:`;
      else
        content = settings.welcomeMessage
          ? settings.welcomeMessage
          : `The -member-, joined the server using the invitation of the -target-.`;

      if (invite.inviter) {
        db.set(`invites.${member.id}.inviter`, invite.inviter.id);
        if (fake) {
          total = db.add(`invites.${invite.inviter.id}.total`, 1);
          _fake = db.add(`invites.${invite.inviter.id}.fake`, 1);
        } else {
          total = db.add(`invites.${invite.inviter.id}.total`, 1);
          regular = db.add(`invites.${invite.inviter.id}.regular`, 1);
        }
        var im = guild.member(invite.inviter.id);
        bonus = db.get(`invites.${invite.inviter.id}.bonus`) || 0;
        if (im)
          global.onUpdateInvite(im, guild.id, Number(total + Number(bonus)));
      }

      db.set(`invites.${member.id}.isfake`, fake);

      if (channel) {
        const log = new Discord.MessageEmbed()
          .setColor("YELLOW")
          .setFooter("SUN BOT")
          .setTimestamp()
          .setDescription(
            ` \`${
              member.user.tag
            } \`Adlı Kişi Sunucuya Katıldı. Davet Eden Şahıs: **${
              invite.inviter.tag
            }** (**${total + bonus}** davet!)`
          );
        channel.send(log);
      }
    })
    .catch();
});

client.on("guildMemberRemove", member => {
  const db = new Database("./Servers/" + member.guild.id, "Invites"),
    settings =
      new Database("./Servers/" + member.guild.id, "Settings").get(
        "settings"
      ) || {};
  var total = 0,
    bonus = 0,
    regular = 0,
    fakecount = 0,
    channel = member.guild.channels.cache.get(settings.Channel),
    content = settings.leaveMessage
      ? settings.leaveMessage
      : `${member} is left the server.`,
    data = db.get(`invites.${member.id}`);
  if (!data) {
    return;
  }
  if (data === null) data = "Bulunamadı";
  if (data.isfake && data.inviter) {
    fakecount = db.sub(`invites.${data.inviter}.fake`, 1);
    total = db.sub(`invites.${data.inviter}.total`, 1);
  } else if (data.inviter) {
    regular = db.sub(`invites.${data.inviter}.regular`, 1);
    total = db.sub(`invites.${data.inviter}.total`, 1);
  }
  if (data.inviter) bonus = db.get(`invites.${data.inviter}.bonus`) || 0;

  var im = member.guild.member(data.inviter);
  if (im)
    global.onUpdateInvite(im, member.guild.id, Number(total) + Number(bonus));

  db.add(`invites.${data.inviter}.leave`, 1);
  if (channel) {
    let user = client.users.cache.get(data.inviter);
    const log = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setFooter("SUN BOT")
      .setTimestamp()
      .setDescription(
        ` ${member.user.tag} sunucudan ayrıldı. Şahsı davet eden: **${
          user.tag
        }** (**${Number(total) + Number(bonus)}** davet!)`
      );
    channel.send(log);
  }
});

global.onUpdateInvite = (guildMember, guild, total) => {
  if (!guildMember.manageable) return;
  const rewards =
    new Database("./Servers/" + guild, "Rewards").get("rewards") || [];
  if (rewards.length <= 0) return;
  var taken = rewards.filter(
    reward => reward.Invite > total && guildMember.roles.cache.has(reward.Id)
  );
  taken.forEach(take => {
    guildMember.roles.remove(take.Id);
  });
  var possible = rewards.filter(
    reward => reward.Invite <= total && !guildMember.roles.cache.has(reward.Id)
  );
  possible.forEach(pos => {
    guildMember.roles.add(pos.Id);
  });
};
*/
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

client.on("message", async message => {
  if (!message.guild) return;
  let acikmi = await db.fetch(`${message.guild.id}.capsengel`);
  if (!acikmi) return;
  if (message.author.bot) return;
  if (message.member.hasPermission("MANAGE_MESSAGES")) return;
  let matched = message.content.replace(/[^A-Z]/g, "").length;
  let yuzde = percentage(matched, message.content.length);
  if (Math.round(yuzde) > acikmi.yuzde) {
    message.delete();
    message.author.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setFooter(
          `${message.guild.name}`,
          message.guild.iconURL({ dynamic: true })
        )
        .setAuthor("CapsLock Engelleme Sistemi")
        .setDescription(
          "**Uyarı! " +
            message.guild.name +
            " Sunucusunda Büyük Harfle Yazma Engeli Bulunmaktadır!**\nBu Sebepten Göndermiş Olduğunuz Mesaj Silindi."
        )
    );
    message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setFooter(
            `${message.guild.name}`,
            message.guild.iconURL({ dynamic: true })
          )
          .setAuthor(
            "CapsLock Engelleme Sistemi",
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            message.author.username +
              " - " +
              (message.member.nickname
                ? `${message.member.nickname} - ${message.author.id}`
                : message.author.id) +
              "\n**Uyarı!  Bu sunucuda büyük harfle yazma engeli bulunmaktadır!**\nBu sebepten göndermiş olduğunuz mesaj silindi."
          )
      )
      .then(msg => msg.delete({ timeout: 3000 }));
  } else {
    return;
  }
});

client.on("ready", () => require("quick.db").set("start", Date.now()));
