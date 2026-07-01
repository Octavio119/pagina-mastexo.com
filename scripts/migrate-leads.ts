/**
 * Migra leads de data/leads.json a Supabase.
 *
 * Uso:
 *   cd mastexo.com
 *   $env:SUPABASE_URL="https://dvceplsykatplkisvvih.supabase.co"
 *   $env:SUPABASE_SECRET_KEY="<tu secret key>"
 *   npx ts-node scripts/migrate-leads.ts
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SECRET_KEY

if (!url || !key) {
  console.error('❌  Falta SUPABASE_URL o SUPABASE_SECRET_KEY en las variables de entorno.')
  process.exit(1)
}

const supabase = createClient(url, key)

async function migrate() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'leads.json')

  if (!fs.existsSync(filePath)) {
    console.log('No existe leads.json, nada que migrar.')
    return
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const leads = JSON.parse(raw)

  if (!leads.length) {
    console.log('leads.json está vacío.')
    return
  }

  console.log(`Migrando ${leads.length} leads...`)

  const rows = leads.map((l: any) => ({
    id:         l.id,
    name:       l.name       || 'Sin nombre',
    business:   l.business   || '',
    email:      l.email      || 'sin@email.com',
    whatsapp:   l.whatsapp   || '',
    category:   l.category   || 'General',
    message:    l.message    || '',
    budget:     l.budget     || '',
    status:     l.status     || 'new',
    created_at: l.createdAt  || new Date().toISOString(),
  }))

  const { error } = await supabase.from('leads').upsert(rows, { onConflict: 'id' })

  if (error) {
    console.error('Error en migración:', error.message)
    process.exit(1)
  } else {
    console.log(`✅ ${rows.length} leads migrados exitosamente a Supabase`)
  }
}

migrate()
