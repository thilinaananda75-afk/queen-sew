const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Bot configuration
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "whatsapp-bot"
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// QR code generation
client.on('qr', (qr) => {
    console.log('QR Code received! Scan with WhatsApp:');
    qrcode.generate(qr, { small: true });
    
    // Save QR for web interface
    fs.writeFileSync('qr.txt', qr);
    console.log('QR code saved to qr.txt');
});

// Ready event
client.on('ready', () => {
    console.log('✅ WhatsApp Bot is ready!');
    console.log('Bot is now connected and listening for messages...');
});

// Authentication success
client.on('authenticated', () => {
    console.log('✅ Authentication successful!');
});

// Authentication failure
client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
});

// Disconnected
client.on('disconnected', (reason) => {
    console.log('❌ Client was disconnected:', reason);
});

// Message handler
client.on('message', async (message) => {
    console.log(`📩 Message from ${message.from}: ${message.body}`);
    
    const chat = await message.getChat();
    const contact = await message.getContact();
    
    // Command: !ping
    if (message.body.toLowerCase() === '!ping') {
        await message.reply('🏓 Pong!');
    }
    
    // Command: !help
    else if (message.body.toLowerCase() === '!help') {
        const helpMessage = `
🤖 *WhatsApp Bot Commands*

*Available Commands:*
• !ping - Check if bot is alive
• !help - Show this help message
• !info - Get bot information
• !time - Get current time
• !echo <text> - Echo your message
• !sticker - Reply to an image to convert to sticker

Made with ❤️ using whatsapp-web.js
        `.trim();
        await message.reply(helpMessage);
    }
    
    // Command: !info
    else if (message.body.toLowerCase() === '!info') {
        const info = await client.info;
        await message.reply(`
🤖 *Bot Information*

📱 Platform: ${info.platform}
🔋 Battery: ${info.battery}%
📡 Connected: Yes
💬 Chat: ${chat.name || 'Private Chat'}
        `.trim());
    }
    
    // Command: !time
    else if (message.body.toLowerCase() === '!time') {
        const now = new Date();
        await message.reply(`🕐 Current Time: ${now.toLocaleString('si-LK', { timeZone: 'Asia/Colombo' })}`);
    }
    
    // Command: !echo
    else if (message.body.toLowerCase().startsWith('!echo ')) {
        const text = message.body.substring(6);
        await message.reply(`🔊 Echo: ${text}`);
    }
    
    // Command: !sticker (reply to an image)
    else if (message.body.toLowerCase() === '!sticker') {
        if (message.hasQuotedMsg) {
            const quotedMsg = await message.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                await chat.sendMessage('⏳ Creating sticker...');
                const media = await quotedMsg.downloadMedia();
                await client.sendMessage(message.from, media, { 
                    sendMediaAsSticker: true,
                    stickerName: 'Bot Sticker',
                    stickerAuthor: 'WhatsApp Bot'
                });
            } else {
                await message.reply('❌ Please reply to an image!');
            }
        } else {
            await message.reply('❌ Please reply to an image with !sticker');
        }
    }
    
    // Auto-reply to mentions (in groups)
    else if (chat.isGroup && message.mentionedIds.length > 0) {
        const botNumber = (await client.info).wid._serialized;
        if (message.mentionedIds.includes(botNumber)) {
            await message.reply('👋 Hello! I was mentioned. Type !help to see what I can do!');
        }
    }
});

// Group join event
client.on('group_join', async (notification) => {
    console.log('👥 New member joined group');
    const chat = await notification.getChat();
    await chat.sendMessage('👋 Welcome to the group!');
});

// Initialize client
console.log('🚀 Starting WhatsApp Bot...');
client.initialize();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n⏹️  Shutting down bot...');
    await client.destroy();
    process.exit(0);
});
