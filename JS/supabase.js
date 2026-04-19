import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://irzrkuzksywoiuorvicr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyenJrdXprc3l3b2l1b3J2aWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzOTgyMTUsImV4cCI6MjA5MTk3NDIxNX0.f6LvlxhDHV7P2M0X0mBihL9O4WpM1lk9B2PMGKtCnX0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
