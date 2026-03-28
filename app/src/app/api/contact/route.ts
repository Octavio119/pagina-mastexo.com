import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

// ── HTML escaping — prevents XSS via email template ──────────────────────────
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
}

// ── Input validation ──────────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  // No newlines (email header injection) + standard format
  if (/[\r\n]/.test(email)) return false;
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

// ── In-memory rate limiting (3 submissions / IP / hour) ──────────────────────
type RateEntry = { count: number; resetAt: number };
const rateMap = new Map<string, RateEntry>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ── WhatsApp via CallMeBot ────────────────────────────────────────────────────
async function notifyWhatsApp(
  name: string, business: string, whatsapp: string,
  email: string, category: string, improve: string
) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apiKey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apiKey) return;

  const text = [
    `🔔 *Nuevo lead Mastexo*`,
    `👤 ${name} — ${business}`,
    `📱 ${whatsapp}`,
    `📧 ${email}`,
    `🏷️ ${category}`,
    `💬 ${improve.slice(0, 200)}`,
  ].join("\n");

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`CallMeBot responded ${res.status}`);
}

// ── Email via SMTP ────────────────────────────────────────────────────────────
async function sendEmail(
  name: string, business: string, email: string, whatsapp: string,
  category: string, improve: string, budget: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.verify();

  const safeWhatsapp = whatsapp.replace(/\D/g, "");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:8px;">
      <h2 style="color:#D4A853;margin-top:0;">🔔 Nuevo diagnóstico — Mastexo</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#888;width:140px;">Nombre</td><td style="padding:8px 0;color:#fff;">${esc(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Negocio</td><td style="padding:8px 0;color:#fff;">${esc(business)}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;color:#fff;"><a href="mailto:${esc(email)}" style="color:#D4A853;">${esc(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#888;">WhatsApp</td><td style="padding:8px 0;color:#fff;"><a href="https://wa.me/${safeWhatsapp}" style="color:#D4A853;">+${safeWhatsapp}</a></td></tr>
        <tr><td style="padding:8px 0;color:#888;">Categoría</td><td style="padding:8px 0;color:#fff;">${esc(category)}</td></tr>
        ${budget ? `<tr><td style="padding:8px 0;color:#888;">Presupuesto</td><td style="padding:8px 0;color:#fff;">${esc(budget)}</td></tr>` : ""}
      </table>
      <div style="margin-top:20px;padding:16px;background:#111;border-left:3px solid #D4A853;border-radius:4px;">
        <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Qué quiere mejorar</p>
        <p style="margin:8px 0 0;color:#fff;">${esc(improve)}</p>
      </div>
      <p style="margin-top:24px;font-size:12px;color:#444;">Enviado desde mastexo.com · ${new Date().toLocaleString("es-CL")}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Mastexo Formulario" <${process.env.SMTP_USER}>`,
    to: process.env.LEAD_EMAIL ?? "contactos@mastexo.com",
    replyTo: email, // already validated above
    subject: `Diagnóstico: ${name} — ${business} (${category})`,
    html,
  });
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return Response.json(
      { ok: false, error: "Demasiados intentos. Intenta de nuevo en una hora." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return Response.json({ ok: false, error: "Petición inválida" }, { status: 400 });
  }

  const { name, business, email, whatsapp, category, improve, budget } = body;

  // Required fields
  if (!name || !business || !email || !whatsapp || !improve) {
    return Response.json({ ok: false, error: "Faltan campos requeridos" }, { status: 400 });
  }

  // Length limits — prevent abuse
  if (
    String(name).length > 100 ||
    String(business).length > 100 ||
    String(email).length > 254 ||
    String(whatsapp).length > 20 ||
    String(improve).length > 2000
  ) {
    return Response.json({ ok: false, error: "Datos demasiado largos" }, { status: 400 });
  }

  // Format validation
  if (!isValidEmail(String(email))) {
    return Response.json({ ok: false, error: "Email inválido" }, { status: 400 });
  }

  if (!isValidPhone(String(whatsapp))) {
    return Response.json({ ok: false, error: "Número de WhatsApp inválido" }, { status: 400 });
  }

  const results = await Promise.allSettled([
    sendEmail(
      String(name), String(business), String(email), String(whatsapp),
      String(category ?? "General"), String(improve), String(budget ?? "")
    ),
    notifyWhatsApp(
      String(name), String(business), String(whatsapp),
      String(email), String(category ?? "General"), String(improve)
    ),
  ]);

  const [emailResult, waResult] = results;
  if (emailResult.status === "rejected") console.error("[contact] Email failed:", emailResult.reason);
  if (waResult.status === "rejected") console.error("[contact] WhatsApp failed:", waResult.reason);

  if (results.every((r) => r.status === "rejected")) {
    return Response.json(
      { ok: false, error: "No se pudo enviar la solicitud. Contáctanos por WhatsApp." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
