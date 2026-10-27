// lib/metaCapi.ts
import crypto from "crypto";

interface CapiEventPayload {
    eventName: "Purchase" | "InitiateCheckout";
    eventId: string;
    sourceUrl: string;
    clientIp?: string;
    clientUserAgent?: string;
    fbp?: string;
    fbc?: string;
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
        console.warn("⚠️ Meta CAPI: Missing NEXT_PUBLIC_FACEBOOK_PIXEL_ID or META_CONVERSIONS_API_ACCESS_TOKEN.");
        return { success: false, error: "Missing API credentials" };
    }

    const userData: Record<string, any> = {};

    // 1. Phone Normalization (Bangladeshi 8801XXXXXXXXX)
    let rawPhone = payload.customer.phone?.replace(/[^0-9]/g, "") || "";
    if (rawPhone.startsWith("01") && rawPhone.length === 11) {
        rawPhone = "88" + rawPhone;
    }
    if (rawPhone.length >= 11) {
        userData.ph = [hashValue(rawPhone)];
    }

    // 2. First Name Hashing (Ensures no empty string hash is sent)
    const firstName = payload.customer.name?.trim().split(/\s+/)[0];
    if (firstName && firstName.length > 0) {
        userData.fn = [hashValue(firstName)];
    }

    // 3. Client Context (Raw, unhashed per Meta specs)
    if (payload.clientIp) {
        userData.client_ip_address = payload.clientIp;
    }
    if (payload.clientUserAgent) {
        userData.client_user_agent = payload.clientUserAgent;
    }
    if (payload.fbp) {
        userData.fbp = payload.fbp;
    }
    if (payload.fbc) {
        userData.fbc = payload.fbc;
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
            console.error("❌ Meta CAPI API Error:", data);
            return { success: false, error: data };
        }

        return { success: true, data };
    } catch (error) {
        console.error("❌ Meta CAPI Network Error:", error);
        return { success: false, error };
    }
}