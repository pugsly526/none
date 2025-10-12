const config = require('../settings');
const moment = require('moment-timezone');
const { lee, commands } = require('../lee');
const axios = require('axios');
const { getPrefix } = require('../lib/prefix');
const prefix = getPrefix();

lee({
  pattern: "menu2",
  alias: ["allmenu2"],
  use: '.menu2',
  desc: "Show all bot commands",
  category: "menu",
  react: "⚡️",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const totalCommands = commands.length;
    const date = moment().tz("Africa/Nairobi").format("dddd, DD MMMM YYYY");

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    // Menu principal
    let menuText = `
*╭══🤖 ${config.BOT_NAME}*
*┃❃* *ᴜsᴇʀ* : @${m.sender.split("@")[0]}
*┃❃* *ʀᴜɴᴛɪᴍᴇ* : ${uptime()}
*┃❃* *ᴍᴏᴅᴇ* : *${config.MODE}*
*┃❃* *ᴘʀᴇғɪx* : [ ${prefix} ]
*┃❃* *ᴩʟᴜɢɪɴ* : ${totalCommands}
*┃❃* *ᴅᴇᴠ* : *ꜱᴀɴɢ ʟᴇᴇ*
*┃❃* *ᴠᴇʀsɪᴏɴs* ${config.version}
*┕──────────────❒*
`;


    // Catégories et commandes
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    const keys = Object.keys(category).sort();
    for (let k of keys) {
      menuText += `\n\n*╭─${k.toUpperCase()} MENU*`;
      const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach((cmd) => {
        const usage = cmd.pattern.split('|')[0];
        menuText += `\n├➤ ${config.PREFIX}${usage}`;
      });
      menuText += `\n*┕──────────────❒*`;
    }

    // Affecter à la variable caption
    const selectedStyle = menuText;

    // Envoyer l'image avec le menu
    await conn.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/018gb0.png' },
      caption: selectedStyle,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363403627964616@newsletter',
          newsletterName: config.OWNER_NAME || 'Sang Lee',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});