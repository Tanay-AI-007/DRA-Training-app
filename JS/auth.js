import { supabase } from './supabase.js'

// ── REGISTER ──────────────────────────────────────────────────────
export async function registerStudent(fullName, email, password, language, accessCode) {
  // 1. Verify access code
  const { data: codes, error: codeError } = await supabase
    .from('access_codes')
    .select('code')
    .order('created_at', { ascending: false })
    .limit(1)

  if (codeError || !codes || codes.length === 0) {
    return { error: 'Could not verify access code. Please try again.' }
  }

  if (codes[0].code !== accessCode) {
    return { error: 'Invalid access code. Contact your institute.' }
  }

  // 2. Create auth account
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })

  if (authError) return { error: authError.message }

  // 3. Save student profile
  const { error: profileError } = await supabase
    .from('students')
    .insert({
      id: authData.user.id,
      full_name: fullName,
      language: language,
      last_verified_code: accessCode,
      is_active: true
    })

  if (profileError) return { error: profileError.message }

  return { success: true }
}

// ── LOGIN ─────────────────────────────────────────────────────────
export async function loginStudent(email, password, accessCode) {
  // 1. Verify access code
  const { data: codes, error: codeError } = await supabase
    .from('access_codes')
    .select('code')
    .order('created_at', { ascending: false })
    .limit(1)

  if (codeError || !codes || codes.length === 0) {
    return { error: 'Could not verify access code. Please try again.' }
  }

  if (codes[0].code !== accessCode) {
    return { error: 'Wrong access code. Get the new one from your institute.' }
  }

  // 2. Sign in
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: error.message }

  // 3. Update verified code
  await supabase
    .from('students')
    .update({ last_verified_code: accessCode })
    .eq('id', data.user.id)

  return { success: true }
}

// ── LOGOUT ────────────────────────────────────────────────────────
export async function logout() {
  await supabase.auth.signOut()
  window.location.href = '/index.html'
}

// ── GET SESSION ───────────────────────────────────────────────────
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

// ── GUARD: redirect to login if not logged in ─────────────────────
export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    window.location.href = '/login.html'
  }
  return session
}
