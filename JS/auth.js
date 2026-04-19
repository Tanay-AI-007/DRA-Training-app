import { auth, db } from './firebase.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  doc, setDoc, updateDoc, collection,
  query, orderBy, limit, getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function getLatestAccessCode() {
  const q = query(
    collection(db, 'access_codes'),
    orderBy('created_at', 'desc'),
    limit(1)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  return snapshot.docs[0].data().code
}

export async function registerStudent(fullName, email, password, language, accessCode) {
  const latestCode = await getLatestAccessCode()
  if (!latestCode) return { error: 'No access code found. Contact your institute.' }
  if (latestCode !== accessCode) return { error: 'Invalid access code. Contact your institute.' }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    .catch(err => ({ error: err.message }))
  if (userCredential.error) return userCredential

  await setDoc(doc(db, 'students', userCredential.user.uid), {
    full_name: fullName,
    email: email,
    language: language,
    last_verified_code: accessCode,
    is_active: true,
    created_at: new Date()
  })

  return { success: true }
}

export async function loginStudent(email, password, accessCode) {
  const latestCode = await getLatestAccessCode()
  if (!latestCode) return { error: 'No access code found. Contact your institute.' }
  if (latestCode !== accessCode) return { error: 'Wrong access code. Get the new one from your institute.' }

  const userCredential = await signInWithEmailAndPassword(auth, email, password)
    .catch(err => ({ error: err.message }))
  if (userCredential.error) return userCredential

  await updateDoc(doc(db, 'students', userCredential.user.uid), {
    last_verified_code: accessCode
  })

  return { success: true }
}

export async function logout() {
  await signOut(auth)
  window.location.href = '/index.html'
}

export async function getSession() {
  return new Promise(resolve => {
    onAuthStateChanged(auth, user => resolve(user))
  })
}

export async function requireAuth() {
  const user = await getSession()
  if (!user) window.location.href = '/login.html'
  return user
}
