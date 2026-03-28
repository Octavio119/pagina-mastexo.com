"use client";

import { useState, useEffect, useCallback } from "react";

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

const STATUS_STYLES: Record<Lead["status"], string> = {
  new: "bg-[#D4A853]/10 text-[#D4A853] border border-[#D4A853]/30",
  contacted: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  closed: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  Restaurantes: "🍽️",
  Barberías: "✂️",
  Salones: "💇",
  Tiendas: "🛍️",
  Cafeterías: "☕",
  "Food Trucks": "🚚",
  Carritos: "🛒",
  General: "💼",
};

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_key");
    if (saved) setAdminKey(saved);
  }, []);

  const fetchLeads = useCallback(async (key: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads", { headers: { "x-admin-key": key } });
      if (!res.ok) throw new Error();
      setLeads(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (adminKey) fetchLeads(adminKey);
  }, [adminKey, fetchLeads]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(false);
    try {
      const res = await fetch("/api/leads", { headers: { "x-admin-key": password } });
      if (!res.ok) throw new Error();
      sessionStorage.setItem("admin_key", password);
      setAdminKey(password);
      setLeads(await res.json());
    } catch {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id: string, status: string) => {
    if (!adminKey) return;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: status as Lead["status"] } : l)));
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id, status }),
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_key");
    setAdminKey(null);
    setLeads([]);
  };

  /* ── Login screen ── */
  if (!adminKey) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4A853] to-transparent mb-10" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4A853] mb-1 text-center">Mastexo</p>
          <h1
            className="text-2xl font-light text-white text-center mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Panel de <em className="italic text-[#D4A853]">administración</em>
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-[#111] border border-[#222] text-white text-sm px-4 py-3 outline-none transition-all placeholder:text-[#444] focus:border-[#D4A853]"
            />
            {loginError && (
              <p className="text-red-400 text-xs text-center">Contraseña incorrecta</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#D4A853] py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-all hover:bg-[#E8C87A] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  /* ── Dashboard ── */
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Top bar */}
      <header className="border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-widest text-[#D4A853] font-semibold">Mastexo</span>
          <span className="text-white/20">/</span>
          <span className="text-[11px] uppercase tracking-widest text-white/40">Leads</span>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => fetchLeads(adminKey)}
            className="text-[11px] uppercase tracking-widest text-white/35 hover:text-white transition-colors"
          >
            Actualizar
          </button>
          <button
            onClick={handleLogout}
            className="text-[11px] uppercase tracking-widest text-white/35 hover:text-white transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total", value: counts.total },
            { label: "Nuevos", value: counts.new, accent: true },
            { label: "Contactados", value: counts.contacted },
            { label: "Cerrados", value: counts.closed },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#0f0f0f] border border-white/8 px-4 py-5 text-center"
            >
              <div
                className={`text-3xl font-light ${s.accent ? "text-[#D4A853]" : "text-white"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-widest text-white/30">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-white/25 text-sm">
            Cargando…
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/25">
            <p className="text-sm">No hay leads todavía.</p>
            <p className="text-xs mt-1 text-white/15">
              Aparecerán aquí cuando alguien complete el formulario.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/8">
                  {["Negocio", "Contacto", "Categoría", "WhatsApp", "Mensaje", "Presupuesto", "Fecha", "Estado"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] uppercase tracking-widest text-white/25 py-3 px-4 font-normal first:pl-0 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <>
                    <tr
                      key={lead.id}
                      className="border-b border-white/5 hover:bg-white/[0.025] transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                    >
                      {/* Negocio */}
                      <td className="py-4 px-4 first:pl-0">
                        <p className="font-medium text-white leading-snug">{lead.business}</p>
                        <p className="text-[11px] text-white/35 mt-0.5">{lead.email}</p>
                      </td>

                      {/* Contacto */}
                      <td className="py-4 px-4 text-white/60 whitespace-nowrap">{lead.name}</td>

                      {/* Categoría */}
                      <td className="py-4 px-4 text-white/50 whitespace-nowrap">
                        {CATEGORY_EMOJIS[lead.category] ?? "💼"} {lead.category}
                      </td>

                      {/* WhatsApp */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hola ${lead.name}, soy de Mastexo. 👋`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] text-[11px] font-medium px-3 py-1.5 transition-colors whitespace-nowrap"
                        >
                          {WA_ICON}
                          {lead.whatsapp}
                        </a>
                      </td>

                      {/* Mensaje */}
                      <td className="py-4 px-4 max-w-[180px]">
                        <p className="text-white/40 text-xs truncate" title={lead.message}>
                          {lead.message || "—"}
                        </p>
                      </td>

                      {/* Presupuesto */}
                      <td className="py-4 px-4 text-white/35 text-xs whitespace-nowrap">
                        {lead.budget || "—"}
                      </td>

                      {/* Fecha */}
                      <td className="py-4 px-4 text-white/35 text-xs whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("es-CL", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Estado */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatus(lead.id, e.target.value)}
                          className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1.5 outline-none cursor-pointer bg-transparent transition-all ${STATUS_STYLES[lead.status]}`}
                        >
                          <option value="new">Nuevo</option>
                          <option value="contacted">Contactado</option>
                          <option value="closed">Cerrado</option>
                        </select>
                      </td>
                    </tr>

                    {/* Expanded message row */}
                    {expanded === lead.id && (
                      <tr key={`${lead.id}-expanded`} className="border-b border-white/5 bg-white/[0.015]">
                        <td colSpan={8} className="px-4 pb-4 pt-2 first:pl-0">
                          <p className="text-[11px] uppercase tracking-widest text-white/25 mb-1">
                            Mensaje completo
                          </p>
                          <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
                            {lead.message || "Sin mensaje."}
                          </p>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
