// Supabase Client Initialization Stub

// Try to load standard UMD link if available, but the prompt says 
// "No libraries except Supabase JSON client", we will mock the object for the static build
// so the html doesn't throw errors when no module loader is used.

const SUPABASE_URL = 'https://irzrkuzksywoiuorvicr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyenJrdXprc3l3b2l1b3J2aWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzOTgyMTUsImV4cCI6MjA5MTk3NDIxNX0.f6LvlxhDHV7P2M0X0mBihL9O4WpM1lk9B2PMGKtCnX0';

console.log("Supabase stub initialized. Connect this to the actual Supabase project using createClient(SUPABASE_URL, SUPABASE_ANON_KEY).");

// Placeholder Object
window.supabase = {
    auth: {},
    from: () => ({ select: () => ({ eq: () => ({}) }) })
};