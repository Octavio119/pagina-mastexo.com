import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// ── Input validation helpers ──────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  if (/[\r\n]/.test(email)) return false;
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

// ── In-memory rate limiting (5 submissions / IP / hour) ──────────────────────
type RateEntry = { count: number; resetAt: number };
const leadsRateMap = new Map<string, RateEntry>();
const LEADS_RATE_LIMIT = 5;
const LEADS_RATE_WINDOW_MS = 60 * 60 * 1000;

function checkLeadsRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = leadsRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    leadsRateMap.set(ip, { count: 1, resetAt: now + LEADS_RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= LEADS_RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const VALID_STATUSES = new Set(["new", "contacted", "closed"]);

// ── Brute-force protection for admin routes (10 failed attempts / IP / 15 min)
type LoginEntry = { failures: number; lockedUntil: number };
const loginAttemptMap = new Map<string, LoginEntry>();
const MAX_LOGIN_FAILURES = 10;
const LOGIN_LOCK_MS = 15 * 60 * 1000;

function checkAdminAccess(req: NextRequest): "ok" | "locked" | "unauthorized" {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const now = Date.now();
  const entry = loginAttemptMap.get(ip);

  // Check if currently locked
  if (entry && now < entry.lockedUntil) return "locked";

  const authorized = req.headers.get("x-admin-key") === process.env.ADMIN_PASSWORD;

  if (!authorized) {
    const failures = (entry ? entry.failures : 0) + 1;
    loginAttemptMap.set(ip, {
      failures,
      lockedUntil: failures >= MAX_LOGIN_FAILURES ? now + LOGIN_LOCK_MS : 0,
    });
    return "unauthorized";
  }

  // On success, clear failures
  loginAttemptMap.delete(ip);
  return "ok";
}

interface Lead {
  id: string;
  name: string;
  business: string;
  email: string;
  whatsapp: string;
  category: string;
  message: string;
  budget: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
}

function readLeads(): Lead[] {
  ensureFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeLeads(leads: Lead[]) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
}


// GET /api/leads — list all leads (admin only)
export async function GET(req: NextRequest) {
  const access = checkAdminAccess(req);
  if (access === "locked") {
    return NextResponse.json({ error: "Demasiados intentos. Intenta en 15 minutos." }, { status: 429 });
  }
  if (access === "unauthorized") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = readLeads();
  return NextResponse.json(leads);
}

async function sendLeadEmail(lead: Lead) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_EMAIL, LEAD_EMAIL_CC } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !LEAD_EMAIL) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST ?? "smtp.gmail.com",
    port: Number(SMTP_PORT ?? 587),
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const date = new Date(lead.createdAt).toLocaleDateString("es-CL", {
    day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  await transporter.sendMail({
    from: `"Mastexo Leads" <${SMTP_USER}>`,
    to: LEAD_EMAIL,
    cc: LEAD_EMAIL_CC || undefined,
    replyTo: lead.email,
    subject: `🔔 Nuevo lead: ${lead.business} (${lead.category})`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:8px">
        <div style="height:2px;background:linear-gradient(90deg,transparent,#D4A853,transparent);margin-bottom:28px"></div>
        <h2 style="font-weight:300;color:#D4A853;margin:0 0 20px">Nuevo lead en Mastexo</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="color:#888;padding:6px 0;width:130px">Negocio</td><td style="color:#fff;font-weight:600">${lead.business}</td></tr>
          <tr><td style="color:#888;padding:6px 0">Nombre</td><td style="color:#fff">${lead.name}</td></tr>
          <tr><td style="color:#888;padding:6px 0">Categoría</td><td style="color:#fff">${lead.category}</td></tr>
          <tr><td style="color:#888;padding:6px 0">Email</td><td><a href="mailto:${lead.email}" style="color:#D4A853">${lead.email}</a></td></tr>
          <tr><td style="color:#888;padding:6px 0">WhatsApp</td><td><a href="https://wa.me/${lead.whatsapp.replace(/\D/g, "")}?text=Hola+${encodeURIComponent(lead.name)}%2C+soy+de+Mastexo+👋" style="color:#25D366">${lead.whatsapp}</a></td></tr>
          <tr><td style="color:#888;padding:6px 0">Presupuesto</td><td style="color:#fff">${lead.budget || "No especificado"}</td></tr>
          <tr><td style="color:#888;padding:6px 0;vertical-align:top">Mensaje</td><td style="color:#ccc">${lead.message || "—"}</td></tr>
          <tr><td style="color:#888;padding:6px 0">Fecha</td><td style="color:#555;font-size:12px">${date}</td></tr>
        </table>
        <div style="margin-top:24px">
          <a href="https://wa.me/${lead.whatsapp.replace(/\D/g, "")}?text=Hola+${encodeURIComponent(lead.name)}%2C+soy+de+Mastexo+👋" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-size:13px;font-weight:600">💬 Contactar por WhatsApp</a>
        </div>
        <div style="height:1px;background:#1a1a1a;margin-top:28px"></div>
        <p style="color:#333;font-size:11px;margin-top:12px">Mastexo · Panel: /admin</p>
      </div>
    `,
  });
}

// POST /api/leads — save new lead from contact form (no auth needed)
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkLeadsRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Intenta de nuevo en una hora." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Petición inválida" }, { status: 400 });
  }

  const { name, business, email, whatsapp, category, message, budget } = body;

  // Required fields
  if (!name || !business || !email || !whatsapp) {
    return NextResponse.json({ ok: false, error: "Faltan campos requeridos" }, { status: 400 });
  }

  // Length limits
  if (
    String(name).length > 100 ||
    String(business).length > 100 ||
    String(email).length > 254 ||
    String(whatsapp).length > 20 ||
    String(message ?? "").length > 2000
  ) {
    return NextResponse.json({ ok: false, error: "Datos demasiado largos" }, { status: 400 });
  }

  // Format validation
  if (!isValidEmail(String(email))) {
    return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
  }

  if (!isValidPhone(String(whatsapp))) {
    return NextResponse.json({ ok: false, error: "Número de WhatsApp inválido" }, { status: 400 });
  }

  const leads = readLeads();
  const lead: Lead = {
    id: crypto.randomUUID(),
    name: String(name),
    business: String(business),
    email: String(email),
    whatsapp: String(whatsapp),
    category: String(category ?? "General"),
    message: String(message ?? ""),
    budget: String(budget ?? ""),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  leads.unshift(lead);
  writeLeads(leads);

  // Send notification email (non-blocking)
  sendLeadEmail(lead).catch((err) => console.error("[leads] email error:", err));

  return NextResponse.json({ ok: true });
}

// PATCH /api/leads — update lead status (admin only)
export async function PATCH(req: NextRequest) {
  const access = checkAdminAccess(req);
  if (access === "locked") {
    return NextResponse.json({ error: "Demasiados intentos. Intenta en 15 minutos." }, { status: 429 });
  }
  if (access === "unauthorized") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }
  const { id, status } = body;
  if (!id || !VALID_STATUSES.has(status)) {
    return NextResponse.json({ error: "id o status inválido" }, { status: 400 });
  }
  const leads = readLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  leads[idx].status = status as Lead["status"];
  writeLeads(leads);
  return NextResponse.json({ ok: true });
}
