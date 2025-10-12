


const { lee } = require('../lee');

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

lee({
    pattern: "bothosting",
    alias: ["deploy"],
    desc: "Display support and follow links",
    category: "main",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        

        const message = `
*STEPS ON HOW TO DEPLOY A WHATSAPP BOT*
First you need a GitHub account.
Create one using the link:
https://github.com/

Secondly create a discord account.
https://discord.com/login

Once your done creating and verifying the two account, move over to the next step.

*NEXT STEPS*
Next step is to fork the bot repository. Click the link
https://github.com/Thomas-shelby001/PEAKY-BLINDER-MD

Then download the zip file.

Now authorise your discord account then claim coins for 3days, each day u can claim 10 coins.


https://bot-hosting.net/

*NOTE:* Some bot require larger server to process while. (25 coin)

When your done creating a server (25 coin) open the server.

Upload your bot code you have downloaded

Start server Enjoy 😉

*Watch:* tutorial sooon
https://youtube.com/@SangLee-h2i
        `.trim();

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/gqsf1j.jpg' },
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363403627964616@newsletter',
                    newsletterName: '🪀『 𝙿𝙴𝙰𝙺𝚈-𝙱𝙻𝙸𝙽𝙳𝙴𝚁-𝙼𝙳 』🪀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Support Cmd Error:", e);
        reply(`⚠️ An error occurred:\n${e.message}`);
    }
});
