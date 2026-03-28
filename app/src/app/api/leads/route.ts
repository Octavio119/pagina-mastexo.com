import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

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

function isAuthorized(req: NextRequest) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_PASSWORD;
}

// GET /api/leads — list all leads (admin only)
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
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
  const body = await req.json();
  const leads = readLeads();
  const lead: Lead = {
    id: crypto.randomUUID(),
    name: body.name ?? "",
    business: body.business ?? "",
    email: body.email ?? "",
    whatsapp: body.whatsapp ?? "",
    category: body.category ?? "General",
    message: body.message ?? "",
    budget: body.budget ?? "",
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
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await req.json();
  const leads = readLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  leads[idx].status = status;
  writeLeads(leads);
  return NextResponse.json({ ok: true });
}
