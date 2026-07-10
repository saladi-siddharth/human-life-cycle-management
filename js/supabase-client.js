/* ============================================================
   SUPABASE CLIENT INITIALIZATION
   ============================================================ */

// Replace these with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'https://wyumbcqbtadugogyungp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_42_m2eNuJhff8Wk3QGdabg_OGRVlnvw';

// Initialize the Supabase client
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
