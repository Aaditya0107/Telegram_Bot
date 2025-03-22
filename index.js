require("dotenv").config(); // Load environment variables
const TelegramBot = require("node-telegram-bot-api");

// Load BOT_TOKEN from .env file
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Store verified users in memory (Consider using a database for persistence)
const verifiedUsers = new Map();

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = `⚠️ *Don’t click on any ads* you see on this bot.\n\n⭐️ *Welcome to AR Trading VIP* 🤖\nIf you are new here, sign up at:\n[Sign Up Here](https://broker-qx.pro/sign-up/?lid=1221388) ✨\n\n📥 If you're an existing user, enter your *Quotex Trader ID* (e.g., 12345678).\n\n🔍 We’ll verify your details and, if valid, send you the exclusive VIP channel link.\n\n📞 Contact: @ARtradingReal`;
    bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
});

// Function to check if a Trader ID is verified
function isTraderIDVerified(traderID) {
    return verifiedUsers.has(traderID);
}

// Handle Trader ID input (Assuming an 8-digit ID)
bot.onText(/^\d{8}$/, (msg, match) => {
    const chatId = msg.chat.id;
    const traderID = match[0];
    const userName = msg.from.first_name || "User"; // Get user's name

    // Check if the ID is already verified
    if (isTraderIDVerified(traderID)) {
        bot.sendMessage(chatId, `🚫 *This trader ID is already verified by another user.*\n\n✅ Verified by @ARtradingReal.`, { parse_mode: "Markdown" });
        return;
    }

    // Simulate verification (Replace this with actual API verification)
    const isRegistered = Math.random() < 0.5; // Randomly allow or deny (Replace this with real API check)

    if (isRegistered) {
        verifiedUsers.set(traderID, userName);

        bot.sendMessage(chatId, `✅ *Your request is in queue at position: 1.*\nEstimated response time: *10:53:34 AM, 23 Jan, 2025*.\n\n⏳ *Please avoid sending multiple messages to prevent delays.*\n\nThank you *${userName}* for choosing *AR Trading VIP* 💸✨\n\n🔗 [Join VIP Group](https://t.me/+g0NpXqblvFU1NmNl) 🤝✨\n\n*Let’s Trade Together!* 👑💸`, { parse_mode: "Markdown" });
    } else {
        bot.sendMessage(chatId, `❌ *Dear ${userName},*\n\nIt looks like your account was *not registered* using my referral link.\n\n📌 Please sign up using the link below: 👇\n\n🔗 [Sign Up Here](https://broker-qx.pro/sign-up/?lid=1221388)\n\n💰 *Deposit a minimum of $50* after signing up to get VIP access!`, { parse_mode: "Markdown" });
    }
});

// Debugging: Log received messages
bot.on("message", (msg) => {
    console.log("Received message:", msg.text);
});

// Log bot start
console.log("🚀 Bot is running...");
