const { lee } = require("../lee");
const moment = require("moment-timezone");
const config = require("../settings"); 
const os = require("os");
const { runtime } = require('../lib/functions');
let botStartTime = Date.now();

const ALIVE_IMG = config.ALIVE_IMAGE || "https://files.catbox.moe/018gb0.png" ;

lee({
  pattern: "alive",
  alias: ["uptime","runtime"],
  desc: "Check if the bot is active.",
  category: "info",
  react: "🚀",
  filename: __filename
}, async (conn, mek, m, { reply, from }) => {
  try {
    const pushname = m.pushName || "User";
    const harareTime = moment().tz("Africa/Harare").format("HH:mm:ss");
    const harareDate = moment().tz("Africa/Harare").format("dddd, MMMM Do YYYY");
    const runtimeMilliseconds = Date.now() - botStartTime;
    const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
    const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
    const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));
    const formattedInfo = `
 🤴 \`PEAKY BLINDER MD STATUS\` 🤴 

  *Hi👋😄 ${pushname}*

 *⏰ Time: ${harareTime}*
 *📆 Date: ${harareDate}*
 *⏳️ Uptime: ${runtimeHours} hours, ${runtimeMinutes} minutes, ${runtimeSeconds} seconds*
 *🚀 Ram Usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*


 \`Status\`: *Online! 🤗🚀*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙿𝙴𝙰𝙺𝚈-𝙱𝙻𝙸𝙽𝙳𝙴𝚁-𝙼𝙳
🔗 ${config.REPO}
`.trim();

    if (!ALIVE_IMG || !ALIVE_IMG.startsWith("http")) {
      throw new Error("Invalid ALIVE_IMG URL. Please set a valid image URL.");
    }

    await conn.sendMessage(from, {
      image: { url: ALIVE_IMG },
      caption: formattedInfo,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363403627964616@newsletter',
          newsletterName: '⁑ 𝙿𝙴𝙰𝙺𝚈-𝙱𝙻𝙸𝙽𝙳𝙴𝚁-𝙼𝙳 ⁑ ',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    await conn.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/fbnesa.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });
    
  } catch (error) {
    console.error("Error in alive command: ", error);
    const errorMessage = `
 An error occurred while processing the alive command.
 Error Details: ${error.message}
Please report this issue or try again later.
`.trim();
    return reply(errorMessage);
  }
});
