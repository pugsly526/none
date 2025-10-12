const { lee } = require('../lee');

const tinyCaps = (text) => {
  const map = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
  };
  return text.split('').map(c => map[c.toLowerCase()] || c).join('');
};

lee({
  pattern: "dev",
  alias: ["developer", "dev"],
  desc: "Displays the developer info",
  category: "owner",
  react: "👨‍💻",
  filename: __filename
}, async (conn, mek, m, { from, reply, pushname }) => {
  try {
    const name = pushname || "there";

    const caption = `
╭─⌈ *👨‍💻 ${tinyCaps("PEAKY-BLINDER-MD developer")}* ⌋─
│
│ 👋 Hello, *${name}*!
│
│ 🤖 I'm *Sang Lee*, the creator & maintainer
│    of this smart WhatsApp bot.
│
│ 👨‍💻 *OWNER INFO:*
│ ───────────────
│ 🧠 Name    : Sang Lee
│ 🎂 Age     : 19(2025)
│ 📞 Contact : wa.me/254105269466
│ 📺 YouTube : Sang Lee
│            https://youtube.com/@SangLee-h2i
│
╰───────────────

> ⚡ *Powered by PEAKY-BLINDER-MD*
`.trim();

    await conn.sendMessage(
      from,
      {
        image: { url: 'https://files.catbox.moe/2857dd.jpg' },
        caption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363403627964616@newsletter',
            newsletterName: '🪀『 𝙿𝙴𝙰𝙺𝚈-𝙱𝙻𝙸𝙽𝙳𝙴𝚁-𝙼𝙳 』🪀',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "ᴘᴇᴀᴋʏ-ʙʟɪɴᴅᴇʀ-ᴍᴅ Bot",
            body: "Created with ❤️ by  Sang Lee",
            thumbnailUrl: 'https://files.catbox.moe/018gb0.png',
            mediaType: 1,
            renderSmallerThumbnail: true,
            showAdAttribution: true,
            mediaUrl: "https://youtube.com/@SangLee-h2i",
            sourceUrl: "https://youtube.com/@SangLee-h2i"
          }
        }
      },
      { quoted: mek }
    );
  } catch (e) {
    console.error("Error in .owner command:", e);
    return reply(`❌ Error: ${e.message || e}`);
  }
});
