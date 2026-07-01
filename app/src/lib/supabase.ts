import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl) console.error('[supabase] NEXT_PUBLIC_SUPABASE_URL no está definida')
if (!supabaseKey) console.error('[supabase] SUPABASE_SECRET_KEY no está definida')

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')
