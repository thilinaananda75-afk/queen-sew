# WhatsApp Bot with GitHub Actions 🤖

Sinhala භාෂාවෙන් සම්පූර්ණ WhatsApp bot එකක්, pairing website එකක් සහ GitHub Actions automation.

## 🌟 Features

- ✅ WhatsApp Web API integration
- ✅ Beautiful web pairing interface
- ✅ Real-time QR code generation
- ✅ Message handling with commands
- ✅ GitHub Actions CI/CD
- ✅ Socket.IO for live updates
- ✅ Group message support

## 📋 Prerequisites

- Node.js (v16 හෝ වැඩි)
- npm හෝ yarn
- WhatsApp account
- GitHub account (optional, for Actions)

## 🚀 Installation

### 1. Repository Clone කරන්න

```bash
git clone https://github.com/your-username/whatsapp-bot.git
cd whatsapp-bot
```

### 2. Dependencies Install කරන්න

```bash
npm install
```

### 3. Bot Run කරන්න

#### Option 1: Terminal Mode (QR in terminal)

```bash
npm start
```

#### Option 2: Web Mode (QR in browser)

```bash
npm run web
```

ඊට පස්සේ browser එකේ `http://localhost:3000` open කරන්න.

## 📱 WhatsApp Link කරන්නේ කොහොමද?

### Web Interface භාවිතා කරලා:

1. `npm run web` run කරන්න
2. Browser එකේ `http://localhost:3000` open කරන්න
3. QR code එක screen එකේ පෙන්වයි
4. ඔබේ phone එකේ WhatsApp open කරන්න
5. **Settings** > **Linked Devices** යන්න
6. **Link a Device** click කරන්න
7. QR code එක scan කරන්න

### Terminal Mode භාවිතා කරලා:

1. `npm start` run කරන්න
2. Terminal එකේම QR code එක පෙන්වයි
3. ඔබේ phone එකේ WhatsApp open කරන්න
4. QR scan කරන්න

## 🤖 Bot Commands

Bot එකට මේ commands භාවිතා කරන්න පුළුවන්:

| Command | Description |
|---------|-------------|
| `!ping` | Bot alive ද කියලා check කරන්න |
| `!help` | සියලුම commands පෙන්වයි |
| `!info` | Bot details |
| `!time` | වත්මන් වේලාව |
| `!echo <text>` | ඔබේ message එක echo කරයි |
| `!sticker` | Image එකක් sticker එකකට convert කරයි |

## 📁 Project Structure

```
whatsapp-bot/
├── .github/
│   └── workflows/
│       └── main.yml          # GitHub Actions workflow
├── src/
│   ├── bot.js               # Main bot (terminal mode)
│   └── server.js            # Web server + bot
├── public/
│   └── index.html           # Pairing website
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables (Optional)

`.env` file එකක් create කරන්න:

```env
PORT=3000
BOT_NAME=My WhatsApp Bot
```

### Custom Commands Add කරන්නේ කොහොමද?

`src/bot.js` හෝ `src/server.js` file එකේ message handler එකේ:

```javascript
// නව command එකක් add කරන්න
else if (message.body.toLowerCase() === '!mycommand') {
    await message.reply('Your response here!');
}
```

## 🌐 GitHub Actions භාවිතා කරන්නේ කොහොමද?

### Setup:

1. GitHub එකේ repository එකක් create කරන්න
2. Code එක push කරන්න:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/whatsapp-bot.git
git push -u origin main
```

3. එක එක push එකෙන් පස්සේ GitHub Actions automatically run වෙයි

### Workflow Features:

- ✅ Code quality checks
- ✅ Dependency installation
- ✅ Automated testing
- ✅ Deployment on main branch

## 🐳 Docker Support (Optional)

Dockerfile එකක් add කරන්න:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "web"]
```

Run කරන්න:

```bash
docker build -t whatsapp-bot .
docker run -p 3000:3000 whatsapp-bot
```

## 📊 Web Interface Features

- ✅ Real-time QR code display
- ✅ Connection status
- ✅ Live message feed
- ✅ Responsive design
- ✅ Beautiful UI with gradients

## 🔒 Security Tips

- 🔐 `.wwebjs_auth` folder එක `.gitignore` එකේ දාන්න
- 🔐 Sensitive data environment variables වලට දාන්න
- 🔐 Production එකේ proper authentication use කරන්න
- 🔐 HTTPS use කරන්න production deployment වලට

## 🛠️ Development

Development mode එකේ run කරන්න:

```bash
npm run dev
```

මේකෙන් nodemon use වෙලා auto-restart වෙනවා.

## 🐛 Troubleshooting

### QR code පෙන්නේ නැහැ

- Port 3000 free ද කියලා check කරන්න
- Browser console එකේ errors check කරන්න
- Bot restart කරන්න

### Authentication failed

- `.wwebjs_auth` folder එක delete කරලා restart කරන්න
- Latest version of whatsapp-web.js use කරන්න

### Bot disconnects

- Stable internet connection එකක් තියෙනවාද බලන්න
- WhatsApp app එක phone එකේ active තියෙනවාද බලන්න

## 📝 License

MIT License - ඔබට කැමති විදියට use කරන්න පුළුවන්!

## 🤝 Contributing

Pull requests welcome! Bug reports හෝ feature requests GitHub Issues වලින් create කරන්න.

## 📧 Support

ප්‍රශ්න තිබ්බොත් GitHub issue එකක් create කරන්න.

## 🎉 Acknowledgments

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - WhatsApp API
- [Socket.IO](https://socket.io/) - Real-time communication
- [Express](https://expressjs.com/) - Web framework

---

Made with ❤️ for Sri Lankan developers 🇱🇰
