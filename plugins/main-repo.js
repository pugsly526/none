const fetch = require('node-fetch');
const config = require('../settings');
const { lee } = require('../lee');
const fs = require('fs');

lee({
    pattern: "repo",
    alias: ["sc", "script"],
    desc: "Fetch information about a GitHub repository.",
    react: "🪄",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/Thomas-shelby001/PEAKY-BLINDER-MD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const repoData = await response.json();

        const formattedInfo = `
╭━━〔 *𝑷𝑬𝑨𝑲𝒀-𝑩𝑳𝑰𝑵𝑫𝑬𝑹-𝑴𝑫 𝗥𝗘𝗣𝗢* 🚀 〕━⬣
┃ 𖠌  *ɴᴀᴍᴇ*        : ${repoData.name}
┃ ⭐  *sᴛᴀʀs*       : ${repoData.stargazers_count}
┃ 🍴  *ғᴏʀᴋs*       : ${repoData.forks_count}
┃ 👤  *ᴏᴡɴᴇʀ*       : ꜱᴀɴɢ ʟᴇᴇ
┃ 🧾  *ᴅᴇsᴄʀɪᴘᴛɪᴏɴ* : ${repoData.description || 'N/A'}
┃ 🔗  *ʀᴇᴘᴏ ʟɪɴᴋ*   : ${githubRepoURL}
┃ 🧠  *ᴛʏᴘᴇ .allmenu ᴛᴏ sᴛᴀʀᴛ*
╰━━━━━━━━━━━━━━━⬣`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/7drn23.jpg' },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363403627964616@newsletter',
                    newsletterName: 'ᴘᴇᴀᴋʏ-ʙʟɪɴᴅᴇʀ-ᴍᴅ-ʀᴇᴘᴏ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send audio intro
        await conn.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/j3dvqy.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });
    

    } catch (error) {
        console.error("❌ Error in repo command:", error);
        reply("⚠️ Failed to fetch repo info. Please try again later.");
    }
});
