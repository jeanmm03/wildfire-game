import { createClient } from "@supabase/supabase-js";

const ALLOWED_EVENTS = new Set([
  "PAGE_VIEW",
  "PAGE_LEFT",
  "ROOM_CREATED",
  "ROOM_JOINED",
  "GAME_STARTED",
  "WHEEL_SPIN",
  "QUESTION_ANSWERED",
  "BLOCK_COMPLETED",
  "GAME_COMPLETED",
  "NEXT_BLOCK_REQUESTED",
  "EYE_CONTACT_TIMER_STARTED"
]);

function text(value, max = 500) {
  if (value === null || value === undefined) return null;
  return String(value).slice(0, max);
}

function intOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

function numberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export default async (request, context) => {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405);
  }

  const supabaseUrl = Netlify.env.get("SUPABASE_URL");
  const secretKey = Netlify.env.get("SUPABASE_SECRET_KEY");

  if (!supabaseUrl || !secretKey) {
    console.error("Telemetry: SUPABASE_URL/SUPABASE_SECRET_KEY ausentes.");
    return jsonResponse({ ok: false, error: "server_not_configured" }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  const event = text(body?.event, 80);

  if (!event || !ALLOWED_EVENTS.has(event)) {
    return jsonResponse({ ok: false, error: "invalid_event" }, 400);
  }

  // A função é chamada pelo próprio site. Isto reduz chamadas casuais
  // cross-origin, mas não substitui autenticação/rate limiting.
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;

  if (origin && origin !== requestOrigin) {
    return jsonResponse({ ok: false, error: "origin_not_allowed" }, 403);
  }

  const supabase = createClient(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });

  const geo = context.geo || {};

  const row = {
    event,
    created_at_client: new Date().toISOString(),

    session_id: text(body.session_id, 80),
    visit_id: text(body.visit_id, 80),

    player_name: text(body.player_name, 120),
    player_slot: text(body.player_slot, 20),
    room_code: text(body.room_code, 20),

    block_number: intOrNull(body.block_number),
    question_number: intOrNull(body.question_number),

    ip_address: context.ip || null,

    user_agent: text(request.headers.get("user-agent"), 1500),
    accept_language: text(request.headers.get("accept-language"), 500),

    page_url: text(body.page_url, 2000),
    referrer: text(body.referrer, 2000),

    language_client: text(body.language, 80),
    languages_client: Array.isArray(body.languages)
      ? body.languages.slice(0, 20)
      : null,

    platform_client: text(body.platform, 120),
    timezone_client: text(body.timezone, 120),

    screen_width: intOrNull(body.screen_width),
    screen_height: intOrNull(body.screen_height),
    viewport_width: intOrNull(body.viewport_width),
    viewport_height: intOrNull(body.viewport_height),

    hardware_concurrency: intOrNull(body.hardware_concurrency),
    device_memory_gb: numberOrNull(body.device_memory),
    connection_type: text(body.connection_type, 50),

    geo_city: text(geo.city, 200),
    geo_country_code: text(geo.country?.code, 20),
    geo_country_name: text(geo.country?.name, 200),
    geo_subdivision_code: text(geo.subdivision?.code, 40),
    geo_subdivision_name: text(geo.subdivision?.name, 200),
    geo_timezone: text(geo.timezone, 120),
    geo_postal_code: text(geo.postalCode, 40),

    netlify_request_id: text(context.requestId, 120),
    netlify_site_name: text(context.site?.name, 200),
    netlify_server_region: text(context.server?.region, 80),

    event_data: {
      completed_block: body.completed_block ?? null,
      next_block: body.next_block ?? null
    }
  };

  const { error } = await supabase
    .from("wildfire_access_log")
    .insert(row);

  if (error) {
    console.error("Telemetry Supabase error:", error);
    return jsonResponse(
      { ok: false, error: "database_insert_failed" },
      500
    );
  }

  return jsonResponse({ ok: true });
};
