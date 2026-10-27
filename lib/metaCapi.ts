// lib/metaCapi.ts
import crypto from "crypto";

interface CapiEventPayload {
    eventName: "Purchase" | "InitiateCheckout";
    eventId: string;
    sourceUrl: string;
    clientIp?: string;
    clientUserAgent?: string;
    customer: {
        phone?: string;
        name?: string;
    };
    customData: {
        currency: string;
        value: number;
        content_name?: string;
        content_type?: string;
    };
}

function hashValue(val: string): string {
    return crypto.createHash("sha256").update(val.trim().toLowerCase()).digest("hex");
}

export async function sendMetaCapiEvent(payload: CapiEventPayload) {
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
        return;
    }

    // Format Bangladeshi phone numbers to international standard (8801XXXXXXXXX)
    let formattedPhone = payload.customer.phone?.replace(/[^0-9]/g, "") || "";
    if (formattedPhone.startsWith("01")) {
        formattedPhone = "88" + formattedPhone;
    }

    const userData: Record<string, any> = {};
    if (formattedPhone) {
        userData.ph = [hashValue(formattedPhone)];
    }
    if (payload.customer.name) {
        userData.fn = [hashValue(payload.customer.name.split(" ")[0] || "")];
    }
    if (payload.clientIp) {
        userData.client_ip_address = payload.clientIp;
    }
    if (payload.clientUserAgent) {
        userData.client_user_agent = payload.clientUserAgent;
    }

    const testCode = process.env.META_TEST_EVENT_CODE;

    const body: Record<string, any> = {
        data: [
            {
                event_name: payload.eventName,
                event_time: Math.floor(Date.now() / 1000),
                event_id: payload.eventId,
                event_source_url: payload.sourceUrl,
                action_source: "website",
                user_data: userData,
                custom_data: payload.customData,
            },
        ],
    };

    if (testCode) {
        body.test_event_code = testCode;
    }

    try {
        const res = await fetch(
            `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );
        const data = await res.json();
        if (!res.ok) {
            console.error("Meta CAPI Error:", data);
        }
    } catch (error) {
        console.error("Meta CAPI Request Failed:", error);
    }
}