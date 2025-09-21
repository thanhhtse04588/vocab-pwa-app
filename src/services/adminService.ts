import { ensureFirebase } from './firebaseService';
import type { VocabularySet, VocabularyWord } from '@/types';

/**
 * Admin service for Firebase operations
 */
export class AdminService {
  private static instance: AdminService;
  private db: any;

  constructor() {
    const { db } = ensureFirebase();
    this.db = db;
  }

  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  /**
   * Get all vocabulary sets from Firebase
   */
  async getAllVocabularySets(): Promise<VocabularySet[]> {
    try {
      const { collection, getDocs } = await import('firebase/firestore');
      const setsSnapshot = await getDocs(collection(this.db, 'vocabularySets'));

      return setsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as VocabularySet[];
    } catch (error) {
      console.error('Error fetching vocabulary sets:', error);
      return [];
    }
  }

  /**
   * Get all vocabulary words from Firebase
   */
  async getAllVocabularyWords(): Promise<VocabularyWord[]> {
    try {
      const { collection, getDocs } = await import('firebase/firestore');
      const wordsSnapshot = await getDocs(
        collection(this.db, 'vocabularyWords')
      );

      return wordsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as VocabularyWord[];
    } catch (error) {
      console.error('Error fetching vocabulary words:', error);
      return [];
    }
  }

  /**
   * Get public vocabulary sets from Firebase
   */
  async getPublicVocabularySets(): Promise<any[]> {
    try {
      const { collection, getDocs, query, where } = await import(
        'firebase/firestore'
      );
      const publicSetsQuery = query(
        collection(this.db, 'publicVocabularySets'),
        where('isActive', '==', true)
      );

      const publicSetsSnapshot = await getDocs(publicSetsQuery);

      return publicSetsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching public vocabulary sets:', error);
      return [];
    }
  }

  /**
   * Get system statistics
   */
  async getSystemStats(): Promise<{
    totalVocabularySets: number;
    publicVocabularySets: number;
    totalWords: number;
    totalUsers: number;
    recentActivity: number;
  }> {
    try {
      const [vocabularySets, publicSets, words] = await Promise.all([
        this.getAllVocabularySets(),
        this.getPublicVocabularySets(),
        this.getAllVocabularyWords(),
      ]);

      // Get user count (approximate from auth users)
      const totalUsers = 0; // We don't have user collection yet

      return {
        totalVocabularySets: vocabularySets.length,
        publicVocabularySets: publicSets.length,
        totalWords: words.length,
        totalUsers,
        recentActivity: 0, // TODO: Implement recent activity tracking
      };
    } catch (error) {
      console.error('Error fetching system stats:', error);
      return {
        totalVocabularySets: 0,
        publicVocabularySets: 0,
        totalWords: 0,
        totalUsers: 0,
        recentActivity: 0,
      };
    }
  }

  /**
   * Get vocabulary sets with pagination
   */
  async getVocabularySetsWithPagination(
    page: number = 1,
    limit: number = 10,
    searchQuery?: string,
    filter?: 'all' | 'public' | 'private'
  ): Promise<{
    sets: VocabularySet[];
    total: number;
    hasMore: boolean;
  }> {
    try {
      const { collection, getDocs, query, orderBy } = await import(
        'firebase/firestore'
      );

      let setsQuery = query(
        collection(this.db, 'vocabularySets'),
        orderBy('createdAt', 'desc')
      );

      if (filter === 'public') {
        const { where } = await import('firebase/firestore');
        setsQuery = query(setsQuery, where('isPublic', '==', true));
      } else if (filter === 'private') {
        const { where } = await import('firebase/firestore');
        setsQuery = query(setsQuery, where('isPublic', '==', false));
      }

      const setsSnapshot = await getDocs(setsQuery);
      let sets = setsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as VocabularySet[];

      // Apply search filter
      if (searchQuery) {
        sets = sets.filter(
          (set) =>
            set.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            set.wordLanguage
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            set.meaningLanguage
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      const total = sets.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedSets = sets.slice(startIndex, endIndex);

      return {
        sets: paginatedSets,
        total,
        hasMore: endIndex < total,
      };
    } catch (error) {
      console.error('Error fetching vocabulary sets with pagination:', error);
      return {
        sets: [],
        total: 0,
        hasMore: false,
      };
    }
  }

  /**
   * Moderate vocabulary set (approve/reject/feature)
   */
  async moderateVocabularySet(
    setId: string,
    action: 'approve' | 'reject' | 'feature'
  ): Promise<boolean> {
    try {
      const { doc, updateDoc } = await import('firebase/firestore');

      const setRef = doc(this.db, 'vocabularySets', setId);

      const updateData: any = {
        moderatedAt: new Date().toISOString(),
        moderatedBy: (await import('firebase/auth')).getAuth().currentUser?.uid,
      };

      switch (action) {
        case 'approve':
          updateData.isApproved = true;
          updateData.isRejected = false;
          break;
        case 'reject':
          updateData.isApproved = false;
          updateData.isRejected = true;
          break;
        case 'feature':
          updateData.isFeatured = true;
          break;
      }

      await updateDoc(setRef, updateData);
      return true;
    } catch (error) {
      console.error('Error moderating vocabulary set:', error);
      return false;
    }
  }
}

// Export singleton instance
export const adminService = AdminService.getInstance();
