const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "whatsapp-bot-web"
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

let isReady = false;
let qrCodeData = null;

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('👤 Client connected to web interface');
    
    // Send current status
    socket.emit('status', { 
        ready: isReady,
        qr: qrCodeData 
    });
    
    socket.on('disconnect', () => {
        console.log('👤 Client disconnected');
    });
});

// QR Code event
client.on('qr', async (qr) => {
    console.log('📱 QR Code generated');
    try {
        qrCodeData = await qrcode.toDataURL(qr);
        io.emit('qr', qrCodeData);
        io.emit('status', { ready: false, message: 'Scan QR Code with WhatsApp' });
    } catch (err) {
        console.error('Error generating QR:', err);
    }
});

// Ready event
client.on('ready', () => {
    console.log('✅ WhatsApp Bot is ready!');
    isReady = true;
    qrCodeData = null;
    io.emit('ready');
    io.emit('status', { ready: true, message: 'Bot is connected!' });
});

// Authenticated
client.on('authenticated', () => {
    console.log('✅ Authentication successful');
    io.emit('status', { ready: false, message: 'Authenticated! Loading...' });
});

// Authentication failure
client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
    io.emit('status', { ready: false, message: 'Authentication failed! Try again.' });
});

// Disconnected
client.on('disconnected', (reason) => {
    console.log('❌ Client disconnected:', reason);
    isReady = false;
    io.emit('status', { ready: false, message: 'Disconnected! Reconnecting...' });
});

// Message handler
client.on('message', async (message) => {
    console.log(`📩 ${message.from}: ${message.body}`);
    
    // Emit message to web interface
    io.emit('message', {
        from: message.from,
        body: message.body,
        timestamp: message.timestamp
    });
    
    // Same bot logic as bot.js
    const chat = await message.getChat();
    
    if (message.body.toLowerCase() === '!ping') {
        await message.reply('🏓 Pong!');
    }
    else if (message.body.toLowerCase() === '!help') {
        const helpMessage = `
🤖 *WhatsApp Bot Commands*

*Available Commands:*
• !ping - Check if bot is alive
• !help - Show this help message
• !info - Get bot information
• !time - Get current time
• !echo <text> - Echo your message

Made with ❤️ using whatsapp-web.js
        `.trim();
        await message.reply(helpMessage);
    }
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
    else if (message.body.toLowerCase() === '!time') {
        const now = new Date();
        await message.reply(`🕐 Current Time: ${now.toLocaleString('si-LK', { timeZone: 'Asia/Colombo' })}`);
    }
    else if (message.body.toLowerCase().startsWith('!echo ')) {
        const text = message.body.substring(6);
        await message.reply(`🔊 Echo: ${text}`);
    }
});

// Initialize client
console.log('🚀 Initializing WhatsApp Bot...');
client.initialize();

// Start server
server.listen(PORT, () => {
    console.log(`🌐 Web server running on http://localhost:${PORT}`);
    console.log('📱 Open this URL to see the pairing interface');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n⏹️  Shutting down...');
    await client.destroy();
    server.close();
    process.exit(0);
});
