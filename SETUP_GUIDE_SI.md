# WhatsApp Bot - සම්පූර්ණ Setup Guide 🇱🇰

## 🎯 මේ Bot එකෙන් කරන්න පුළුවන් දේවල්

1. ✅ WhatsApp messages වලට automatically reply කරන්න
2. ✅ Commands භාවිතා කරලා විවිධ tasks කරන්න
3. ✅ Group messages handle කරන්න
4. ✅ Images stickers බවට convert කරන්න
5. ✅ Web interface එකක් හරහා bot එක control කරන්න
6. ✅ GitHub Actions හරහා automatic deployment

---

## 📥 Part 1: Local Computer එකේ Run කරමු

### Step 1: Software Install කරන්න

#### Node.js Install කරන්න:
1. https://nodejs.org/en බලන්න
2. LTS version එක download කරන්න
3. Install කරන්න (Next, Next click කරන්න)
4. Terminal/CMD open කරලා check කරන්න:
```bash
node --version
npm --version
```

#### Git Install කරන්න (Optional):
- Windows: https://git-scm.com/download/win
- Mac: Terminal එකේ `git --version` type කරන්න
- Linux: `sudo apt install git`

### Step 2: Bot Setup කරන්න

#### Method 1: ZIP Download කරලා

1. මේ project එක ZIP එකක් විදියට download කරන්න
2. Extract කරන්න
3. Terminal/CMD open කරන්න extracted folder එකේ
4. Run කරන්න:
```bash
npm install
```

#### Method 2: Git Clone කරලා

```bash
git clone https://github.com/your-username/whatsapp-bot.git
cd whatsapp-bot
npm install
```

### Step 3: Bot Start කරන්න

#### Option A: Terminal Mode (Simple)

```bash
npm start
```

Terminal එකේම QR code එක පෙන්වයි. Phone එකෙන් scan කරන්න.

#### Option B: Web Mode (Recommended)

```bash
npm run web
```

Browser එකේ යන්න: http://localhost:3000

පස්සේ QR code එක phone එකෙන් scan කරන්න.

### Step 4: WhatsApp Link කරන්න

1. ඔබේ phone එකේ **WhatsApp** open කරන්න
2. **Settings** (⚙️) වලට යන්න
3. **Linked Devices** click කරන්න
4. **Link a Device** click කරන්න
5. QR code එක scan කරන්න
6. ✅ Done! Bot එක connected!

---

## 🔧 Part 2: Custom Commands Add කරමු

### නව Command එකක් හදන්න

`src/bot.js` file එක open කරන්න, පස්සේ message handler එකේ:

```javascript
// Example: Weather command
else if (message.body.toLowerCase() === '!weather') {
    await message.reply('☀️ Today is sunny in Colombo!');
}

// Example: Calculator
else if (message.body.toLowerCase().startsWith('!calc ')) {
    const expression = message.body.substring(6);
    try {
        const result = eval(expression);
        await message.reply(`🔢 Result: ${result}`);
    } catch (err) {
        await message.reply('❌ Invalid calculation!');
    }
}

// Example: Random joke
else if (message.body.toLowerCase() === '!joke') {
    const jokes = [
        'Why did the chicken cross the road? To get to the other side!',
        'What do you call a bear with no teeth? A gummy bear!',
        'Why don\'t scientists trust atoms? Because they make up everything!'
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await message.reply(`😄 ${joke}`);
}
```

Save කරලා bot එක restart කරන්න!

---

## 🌐 Part 3: GitHub එකේ Host කරමු

### Step 1: GitHub Account එකක් හදාගන්න

1. https://github.com යන්න
2. Sign up කරන්න (free)
3. Email verify කරන්න

### Step 2: Repository එකක් Create කරන්න

1. GitHub එකේ **New Repository** click කරන්න
2. Name එකක් දෙන්න: `whatsapp-bot`
3. Public හෝ Private select කරන්න
4. **Create Repository** click කරන්න

### Step 3: Code Upload කරන්න

Terminal එකේ project folder එකේ:

```bash
git init
git add .
git commit -m "Initial commit - WhatsApp Bot"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/whatsapp-bot.git
git push -u origin main
```

### Step 4: GitHub Actions Enable කරන්න

1. Repository එකේ **Actions** tab එකට යන්න
2. Workflow එක automatically detect වෙයි
3. Push කරන එක එක code එකෙන් පස්සේ automatically run වෙයි

---

## 🚀 Part 4: VPS එකක Host කරමු (24/7 Running)

### Option 1: Free VPS Services

#### Railway.app (Recommended)
1. https://railway.app/ යන්න
2. GitHub එකෙන් login කරන්න
3. **New Project** > **Deploy from GitHub repo**
4. ඔබේ whatsapp-bot repo එක select කරන්න
5. Environment variables set කරන්න (අවශ්‍ය නම්)
6. Deploy! ✅

#### Render.com
1. https://render.com යන්න
2. GitHub connect කරන්න
3. **New Web Service** click කරන්න
4. whatsapp-bot repo එක select කරන්න
5. Build Command: `npm install`
6. Start Command: `npm run web`
7. Deploy! ✅

### Option 2: Own VPS (Digital Ocean, AWS, etc.)

#### VPS එකක් Setup කරන්න:

```bash
# VPS එකට SSH කරන්න
ssh root@your-vps-ip

# Update කරන්න
sudo apt update && sudo apt upgrade -y

# Node.js install කරන්න
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# PM2 install කරන්න (process manager)
sudo npm install -g pm2

# Git install කරන්න
sudo apt install git -y

# Project clone කරන්න
git clone https://github.com/your-username/whatsapp-bot.git
cd whatsapp-bot

# Dependencies install කරන්න
npm install

# PM2 එකෙන් start කරන්න
pm2 start npm --name "whatsapp-bot" -- run web

# Boot එකේදීම start වෙන්න
pm2 startup
pm2 save
```

#### Nginx Reverse Proxy Setup (Optional):

```bash
sudo apt install nginx -y

# Nginx config
sudo nano /etc/nginx/sites-available/whatsapp-bot
```

Add කරන්න:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable කරන්න:
```bash
sudo ln -s /etc/nginx/sites-available/whatsapp-bot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🐳 Part 5: Docker භාවිතා කරමු

### Docker Install කරන්න:

#### Windows/Mac:
https://www.docker.com/products/docker-desktop download කරන්න

#### Linux:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Docker එකෙන් Run කරන්න:

```bash
# Build කරන්න
docker build -t whatsapp-bot .

# Run කරන්න
docker run -d -p 3000:3000 --name whatsapp-bot whatsapp-bot

# Logs බලන්න
docker logs -f whatsapp-bot

# Stop කරන්න
docker stop whatsapp-bot

# Start කරන්න
docker start whatsapp-bot
```

### Docker Compose භාවිතා කරන්න:

```bash
# Start කරන්න
docker-compose up -d

# Logs බලන්න
docker-compose logs -f

# Stop කරන්න
docker-compose down
```

---

## 🎨 Part 6: Web Interface Customize කරමු

### Colors Change කරන්න

`public/index.html` file එකේ CSS section එකේ:

```css
/* Background gradient change කරන්න */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Bot logo color change කරන්න */
background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);

/* Button colors, text colors වෙනස් කරන්න */
```

### Title Change කරන්න

```html
<title>My Awesome WhatsApp Bot</title>
<h1>My Bot</h1>
```

---

## 🔍 Part 7: Troubleshooting

### Problem: QR Code පෙන්නේ නැහැ

**විසඳුම:**
```bash
# Port busy නම්
lsof -i :3000
kill -9 <PID>

# හෝ වෙනත් port එකකින්
PORT=3001 npm run web
```

### Problem: Authentication Failed

**විසඳුම:**
```bash
# Session data clear කරන්න
rm -rf .wwebjs_auth
rm -rf .wwebjs_cache

# Restart කරන්න
npm run web
```

### Problem: Bot Disconnects

**විසඳුම:**
- Internet connection check කරන්න
- Phone එකේ WhatsApp open තියෙනවාද බලන්න
- Latest version update කරන්න:
```bash
npm update whatsapp-web.js
```

### Problem: Can't Install Dependencies

**විසඳුම:**
```bash
# Cache clear කරන්න
npm cache clean --force

# node_modules delete කරලා ආයෙ install කරන්න
rm -rf node_modules
npm install
```

---

## 📚 Part 8: Advanced Features

### Database Integration (SQLite)

```bash
npm install sqlite3
```

`src/database.js` create කරන්න:
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bot.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        from_user TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

function saveMessage(from, message) {
    db.run('INSERT INTO messages (from_user, message) VALUES (?, ?)', 
           [from, message]);
}

module.exports = { saveMessage };
```

### Scheduled Messages

```bash
npm install node-cron
```

`src/bot.js` එකේ add කරන්න:
```javascript
const cron = require('node-cron');

// Every day at 8 AM
cron.schedule('0 8 * * *', async () => {
    const chatId = 'YOUR_CHAT_ID@c.us';
    await client.sendMessage(chatId, 'Good morning! 🌅');
});
```

### Weather API Integration

```bash
npm install axios
```

```javascript
const axios = require('axios');

else if (message.body.toLowerCase() === '!weather') {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Colombo&appid=YOUR_API_KEY`
    );
    const temp = Math.round(response.data.main.temp - 273.15);
    await message.reply(`🌡️ Temperature in Colombo: ${temp}°C`);
}
```

---

## 💡 Tips & Best Practices

### 1. Session Management
- `.wwebjs_auth` folder එක backup කරන්න
- Git එකට commit කරන්න එපා

### 2. Rate Limiting
- බොහෝ messages එකපාරටම send කරන්න එපා
- Delay add කරන්න:
```javascript
await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
```

### 3. Error Handling
```javascript
try {
    // Your code
} catch (error) {
    console.error('Error:', error);
    await message.reply('❌ Something went wrong!');
}
```

### 4. Logging
```javascript
const fs = require('fs');

function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('bot.log', `[${timestamp}] ${message}\n`);
}
```

---

## 🎓 Resources & Learning

### Documentation
- WhatsApp Web.js: https://docs.wwebjs.dev/
- Node.js: https://nodejs.org/docs/
- Express.js: https://expressjs.com/

### Video Tutorials (Search on YouTube)
- "WhatsApp Bot Node.js Tutorial"
- "GitHub Actions Tutorial"
- "Deploy Node.js App"

### Communities
- Discord: WhatsApp Web.js community
- Stack Overflow
- Reddit: r/node, r/javascript

---

## 🆘 Need Help?

1. README file එක හොඳින් read කරන්න
2. Error messages Google කරන්න
3. GitHub Issues check කරන්න
4. Stack Overflow එකේ අහන්න

---

## 🎉 Congratulations!

ඔබට දැන් සම්පූර්ණ WhatsApp bot එකක්:
- ✅ Working bot with commands
- ✅ Beautiful web interface
- ✅ GitHub Actions automation
- ✅ Ready for deployment

Happy coding! 🚀🇱🇰
