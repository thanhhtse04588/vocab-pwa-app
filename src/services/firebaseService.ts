import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, type Firestore, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import type { VocabularySet, VocabularyWord } from '@/types';

export interface PublicVocabularySetMeta extends Pick<VocabularySet, 'name' | 'description' | 'sourceLanguage' | 'targetLanguage' | 'wordCount' | 'createdAt'> {
  id: string;
}

export interface PublicVocabularySetData {
  set: PublicVocabularySetMeta;
  words: Array<Pick<VocabularyWord, 'word' | 'meaning' | 'pronunciation' | 'example'>>;
}

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

function ensureFirebase(): Firestore {
  if (firestoreDb) return firestoreDb;

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  } as const;

  firebaseApp = initializeApp(firebaseConfig);
  firestoreDb = getFirestore(firebaseApp);
  return firestoreDb;
}

// Fetch list of public/preset vocabulary sets
export async function fetchPublicVocabularySets(): Promise<PublicVocabularySetMeta[]> {
  const db = ensureFirebase();
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
export async function fetchPublicVocabularySetWithWords(setId: string): Promise<PublicVocabularySetData> {
  const db = ensureFirebase();
  const docRef = doc(db, 'publicVocabularySets', setId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Preset set not found');
  }
  const data = docSnap.data() as DocumentData;

  // words are expected in a subcollection `words` or embedded array `words`
  // Prefer embedded array for simplicity; adjust if your structure uses subcollection.
  const words: Array<Pick<VocabularyWord, 'word' | 'meaning' | 'pronunciation' | 'example'>> = Array.isArray(data.words)
    ? (data.words as DocumentData[]).map((w: DocumentData) => ({
        word: String(w.word ?? '').trim(),
        meaning: String(w.meaning ?? '').trim(),
        pronunciation: w.pronunciation ? String(w.pronunciation).trim() : undefined,
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


