import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const configured = Object.values(config).every(
  (value) => typeof value === 'string' && value.trim().length > 0,
)

export const firebaseApp = configured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(config)
  : null

export const auth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null
export const db: Firestore | null = firebaseApp
  ? getFirestore(firebaseApp)
  : null
export const storage: FirebaseStorage | null = firebaseApp
  ? getStorage(firebaseApp)
  : null

export const isFirebaseConfigured = configured
