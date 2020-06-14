const { MessageEmbed } = require("discord.js");
const { getMember, formatDate } = require("../functions.js");
const moment = require('moment');

const Mapping = {
  online: '<:online:719630983648772198> Online',
  idle: '<:idle:719630983782989935> Idle',
  dnd: '<:dnd:719630983586119741> Do Not Disturb',
  offline: '<:invisible:719630983770406942> Offline/Invisible',
  web: ':ringed_planet: Browser',
  desktop: ':desktop: Desktop',
  mobile: ':iphone: Mobile',
}

module.exports.run = async(client, message, args) => {

  let inline = true

  const member = getMember(message, args.join(" "));

  let user = message.mentions.users.first() || message.author;

  let status = Object.entries(member.user.presence.clientStatus)
    .map(entry => entry[0])
    .map(entry => Mapping[entry])
    .join('\n');

  if (member.user.bot) {
    bot = " Yes";
  } else {
    bot = " No";
  }

  const created = formatDate(member.user.createdAt);
  const roles = member.roles.cache
  .sort((a, b) => b.position - a.position)
  .map(role => role.toString())
  .slice(0, -1)

  function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    const Badges = {
      HYPESQUAD_EVENTS: '<:DiscordHypeSquadEvents:718483343657795605> HypeSquad Events',
      HOUSE_BRILLIANCE: '<:BrillianceLogo:717308501281734716> HypeSquad Brilliance',
      HOUSE_BRAVERY: '<:BraveryLogo:717308501134671933> HypeSquad Bravery',
      HOUSE_BALANCE: '<:BalanceLogo:717308501117894696> HypeSquad Balance',
      DISCORD_NITRO: '<:Nitro:717754004335099937> Nitro',
      DISCORD_NITRO_BOOSTER: '<:booster:718483343234170920> Nitro Booster',
      BUGHUNTER_LEVEL_1: 'Bug Hunter',
      EARLY_SUPPORTER: '<:DiscordEarlySupporter:718483343527772261> Early Supporter',
      DISCORD_PARTNER: 'Discord Partner',
      SYSTEM: 'System',
      VERIFIED_DEVELOPER: '<:DiscordVerifiedBotDev:718483343523577896> Verified Bot Developer',
      VERIFIED_BOT: 'Verified Bot'
    }

    let badges = member.user.flags ? member.user.flags.toArray().map(flag => Badges[flag]).join('\n') : undefined;
    if(!badges) badges = 'No badges';

    let embed = new MessageEmbed()
    .setAuthor(`Information about ${member.displayName}`, member.user.displayAvatarURL())
    .setColor(member.user.displayHexColor || "#33a1ee")
    .setThumbnail(member.user.displayAvatarURL({ size: 2048 }))
    .addField(" **Name:**", `**${member.user.username}**`, true)
    .addField(" **Tag:**", `**#${member.user.discriminator}**`, true)
    .addField(` **ID:**`, `**${member.user.id}**`, true)
    .addField(" **Bot:**", `${member.user.bot}`, true)
    .addField(` **Status:**`, `${Mapping[member.user.presence.status]}`, true)
    .addField(" **Client status:**", status, true)
    .addField(" **Badges:**", badges)
    .addField(" **Playing:**", `${member.user.presence.game || '❌ Not playing a game'}`, true)
    .addField(` **Roles:**`, `${roles}`, true)
    .addField(` **Avatar:**`, `[Click here for URL](${member.user.displayAvatarURL()})`)
    .addField(`📌 **Joined at:**`, `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
    .addField("📌 **Created at:**", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} (${checkDays(member.user.createdAt)})`, true)
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    .setTimestamp()

    message.channel.send(embed);

}

module.exports.help = {
    name: "user",
    description: "Check information about a user",
    aliases: ["userinfo", "ui"],
    usage: "`dol.user`"
}
