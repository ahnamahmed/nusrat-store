import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { success: false, error: "A valid email address is required." },
                { status: 400 }
            );
        }

        const timestamp = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Dhaka",
            dateStyle: "medium",
            timeStyle: "short",
        });

        // 1. Forward to external webhook (n8n / Google Sheet) if configured in .env.local
        const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
        if (webhookUrl) {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "Nusrat Panjabi Website Footer",
                    subscribedAt: timestamp,
                }),
            }).catch((err) => console.error("Webhook forwarding error:", err));
        }

        // 2. Alert to your existing Telegram bot
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (botToken && chatId) {
            const message = `
📩 <b>NEW NEWSLETTER SUBSCRIBER</b>
━━━━━━━━━━━━━━━━━━
📧 <b>Email:</b> <code>${email}</code>
🕒 <b>Time:</b> ${timestamp}
🏷️ <b>Source:</b> Footer Newsletter Box
      `.trim();

            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "HTML",
                }),
            }).catch((err) => console.error("Telegram alert error:", err));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Newsletter error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}