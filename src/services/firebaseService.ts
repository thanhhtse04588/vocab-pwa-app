import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  type Firestore,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
  type Auth,
} from 'firebase/auth';
import type { VocabularySet, VocabularyWord } from '@/types';

export interface PublicVocabularySetMeta
  extends Pick<
    VocabularySet,
    | 'name'
    | 'description'
    | 'sourceLanguage'
    | 'targetLanguage'
    | 'wordCount'
    | 'createdAt'
  > {
  id: string;
}

export interface PublicVocabularySetData {
  set: PublicVocabularySetMeta;
  words: Array<
    Pick<VocabularyWord, 'word' | 'meaning' | 'pronunciation' | 'example'>
  >;
}

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let auth: Auth | null = null;

export function ensureFirebase(): { db: Firestore; auth: Auth } {
  if (firestoreDb && auth) return { db: firestoreDb, auth };

  // Validate that all required environment variables are present
  const requiredEnvVars = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  console.log('Environment variables check:');
  console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY);
  console.log('All env vars:', import.meta.env);
  console.log('requiredEnvVars:', requiredEnvVars);
  // Check for missing environment variables
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required Firebase environment variables: ${missingVars.join(
        ', '
      )}. ` +
        'Please check your .env file and ensure all VITE_FIREBASE_* variables are set.'
    );
  }

  const firebaseConfig = {
    apiKey: requiredEnvVars.apiKey,
    authDomain: requiredEnvVars.authDomain,
    projectId: requiredEnvVars.projectId,
    storageBucket: requiredEnvVars.storageBucket,
    messagingSenderId: requiredEnvVars.messagingSenderId,
    appId: requiredEnvVars.appId,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
  } as const;

  firebaseApp = initializeApp(firebaseConfig);
  firestoreDb = getFirestore(firebaseApp);
  auth = getAuth(firebaseApp);
  return { db: firestoreDb, auth };
}

// Authentication functions
export async function signInWithGoogle(): Promise<User> {
  const { auth } = ensureFirebase();
  const provider = new GoogleAuthProvider();

  // Add additional scopes
  provider.addScope('email');
  provider.addScope('profile');

  // Set custom parameters to force account selection
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: unknown) {
    // Handle specific Firebase Auth errors
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string; message: string };

      switch (firebaseError.code) {
        case 'auth/popup-blocked':
          throw new Error('Popup blocked. Please allow popups and try again.');
        case 'auth/popup-closed-by-user':
          // Don't show error if user closes popup - they might have cancelled intentionally
          throw new Error('Login cancelled by user.');
        case 'auth/cancelled-popup-request':
          throw new Error('Login request cancelled. Please try again.');
        case 'auth/account-exists-with-different-credential':
          throw new Error(
            'Account already exists with different login method.'
          );
        case 'auth/operation-not-allowed':
          throw new Error('This login method is not allowed.');
        case 'auth/unauthorized-domain':
          throw new Error('This domain is not authorized for login.');
        default:
          throw new Error(`Login error: ${firebaseError.message}`);
      }
    }

    // Generic error
    throw new Error('Login failed. Please try again.');
  }
}

export async function signOutUser(): Promise<void> {
  const { auth } = ensureFirebase();
  await signOut(auth);
}

export function onAuthStateChange(
  callback: (user: User | null) => void
): () => void {
  const { auth } = ensureFirebase();
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  const { auth } = ensureFirebase();
  return auth.currentUser;
}

// Fetch list of public/preset vocabulary sets
export async function fetchPublicVocabularySets(): Promise<
  PublicVocabularySetMeta[]
> {
  const { db } = ensureFirebase();
  const colRef = collection(db, 'publicVocabularySets');
  const snapshot = await getDocs(colRef);
  const result: PublicVocabularySetMeta[] = [];
  snapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
    const data = docSnap.data() as DocumentData;
    result.push({
      id: docSnap.id,
      name: data.name,
      description: data.description ?? '',
      sourceLanguage: data.sourceLanguage,
      targetLanguage: data.targetLanguage,
      wordCount: data.wordCount ?? 0,
      createdAt: data.createdAt ?? new Date().toISOString(),
    });
  });
  return result;
}

// Fetch a single set with its words
export async function fetchPublicVocabularySetWithWords(
  setId: string
): Promise<PublicVocabularySetData> {
  const { db } = ensureFirebase();
  const docRef = doc(db, 'publicVocabularySets', setId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Preset set not found');
  }
  const data = docSnap.data() as DocumentData;

  // words are expected in a subcollection `words` or embedded array `words`
  // Prefer embedded array for simplicity; adjust if your structure uses subcollection.
  const words: Array<
    Pick<VocabularyWord, 'word' | 'meaning' | 'pronunciation' | 'example'>
  > = Array.isArray(data.words)
    ? (data.words as DocumentData[]).map((w: DocumentData) => ({
        word: String(w.word ?? '').trim(),
        meaning: String(w.meaning ?? '').trim(),
        pronunciation: w.pronunciation
          ? String(w.pronunciation).trim()
          : undefined,
        example: w.example ? String(w.example).trim() : undefined,
      }))
    : [];

  const set: PublicVocabularySetMeta = {
    id: docSnap.id,
    name: data.name,
    description: data.description ?? '',
    sourceLanguage: data.sourceLanguage,
    targetLanguage: data.targetLanguage,
    wordCount: data.wordCount ?? words.length,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };

  return { set, words };
}
