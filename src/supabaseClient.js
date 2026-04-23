import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://jvpnrtbibzrxfukbaohg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2cG5ydGJpYnpyeGZ1a2Jhb2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NTI5OTMsImV4cCI6MjA5MjUyODk5M30.u35iEIL_4dWAOCYXVeK2a5DEL9RoKHkzY4LlomygV3s'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
