// Script to delete all Oxford 3000 presets from Firebase
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBua6fbO18kF-HlRADcuXwSPOz_OAQTLGg',
  authDomain: 'bee-vocab.firebaseapp.com',
  projectId: 'bee-vocab',
  storageBucket: 'bee-vocab.firebasestorage.app',
  messagingSenderId: '946342810871',
  appId: '1:946342810871:web:a8e12034bae521e05c6ff2',
  measurementId: 'G-9HG6TBJ8X8',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteOxfordPresets() {
  try {
    console.log('🔍 Finding all Oxford 3000 presets...');

    // Get all public vocabulary sets
    const colRef = collection(db, 'publicVocabularySets');
    const snapshot = await getDocs(colRef);

    const oxfordPresets = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const setName = data.set?.name || data.name || '';

      if (
        setName.includes('[The3000Oxford]') ||
        setName.includes('The Oxford 3000')
      ) {
        oxfordPresets.push({
          id: doc.id,
          name: setName,
        });
      }
    });

    console.log(`📚 Found ${oxfordPresets.length} Oxford presets to delete:`);
    oxfordPresets.forEach((preset) => {
      console.log(`  - ${preset.name} (ID: ${preset.id})`);
    });

    if (oxfordPresets.length === 0) {
      console.log('✅ No Oxford presets found to delete.');
      return;
    }

    console.log('\n🗑️ Deleting presets...');

    // Delete each preset
    let deletedCount = 0;
    for (const preset of oxfordPresets) {
      try {
        await deleteDoc(doc(db, 'publicVocabularySets', preset.id));
        console.log(`✅ Deleted: ${preset.name}`);
        deletedCount++;
      } catch (error) {
        console.error(`❌ Failed to delete ${preset.name}:`, error.message);
      }
    }

    console.log(
      `\n🎉 Successfully deleted ${deletedCount} out of ${oxfordPresets.length} presets!`
    );

    return {
      success: true,
      deletedCount: deletedCount,
      totalFound: oxfordPresets.length,
    };
  } catch (error) {
    console.error('❌ Error deleting Oxford presets:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Run the deletion
deleteOxfordPresets()
  .then((result) => {
    if (result.success) {
      console.log('\n✅ Deletion completed successfully!');
      process.exit(0);
    } else {
      console.log('\n❌ Deletion failed:', result.error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });
