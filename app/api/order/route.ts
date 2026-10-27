import { NextResponse } from "next/server";
import { sendMetaCapiEvent } from "@/lib/metaCapi";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const headers = req.headers;

        // Extract client IP and User Agent for Meta event matching
        const clientIp =
            headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            headers.get("x-real-ip") ||
            "";
        const clientUserAgent = headers.get("user-agent") || "";

        const timestamp = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Dhaka",
            dateStyle: "medium",
            timeStyle: "short",
        });

        // 1. Trigger Meta Conversions API (CAPI) Server-Side Purchase Event
        if (data.eventId) {
            await sendMetaCapiEvent({
                eventName: "Purchase",
                eventId: data.eventId,
                sourceUrl: headers.get("referer") || "https://nusratpanjabi.com/exclusive",
                clientIp,
                clientUserAgent,
                customer: {
                    phone: data.customer?.phone,
                    name: data.customer?.name,
                },
                customData: {
                    currency: "BDT",
                    value: Number(data.total),
                    content_name: data.productName,
                    content_type: "product",
                },
            }).catch((err) => console.error("Meta CAPI tracking error:", err));
        }

        // 2. Alert Telegram Bot
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (botToken && chatId) {
            const message = `
🛍️ <b>NEW LANDING PAGE ORDER!</b>
━━━━━━━━━━━━━━━━━━━━
📦 <b>Item:</b> ${data.productName}
🎨 <b>Color:</b> ${data.color || "Standard"}
📏 <b>Size:</b> ${data.size} ${data.quantity ? `(${data.quantity} pcs)` : ""}
💵 <b>Total:</b> ৳${data.total} (COD)

👤 <b>Customer:</b> ${data.customer?.name}
📞 <b>Phone:</b> <code>${data.customer?.phone}</code>
📍 <b>Address:</b> ${data.customer?.address} (${data.customer?.area || ""})
🕒 <b>Time:</b> ${timestamp}
      `.trim();

            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "HTML",
                }),
            }).catch((err) => console.error("Telegram notification error:", err));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Order error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}