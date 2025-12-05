import { create } from 'zustand';
import api from '@/lib/api';

interface FollowState {
  followingIds: Set<string>;
  isLoading: boolean;
  follow: (userId: string) => Promise<void>;
  unfollow: (userId: string) => Promise<void>;
  isFollowing: (userId: string) => boolean;
  loadFollowing: () => Promise<void>;
}

export const useFollowStore = create<FollowState>((set, get) => ({
  followingIds: new Set(),
  isLoading: false,

  isFollowing: (userId: string) => {
    return get().followingIds.has(userId);
  },

  loadFollowing: async () => {
    try {
      // Charger depuis l'API les personnes qu'on suit
      // TODO: Remplacer 'me' par l'ID de l'utilisateur connecté
      const { data } = await api.get('/users/me/follow-stats');
      const followingIds = new Set(data.data.following.map((u: any) => u.id));
      set({ followingIds });
    } catch (error) {
      console.error('Error loading following:', error);
    }
  },

  follow: async (userId: string) => {
    set({ isLoading: true });
    try {
      await api.post(`/users/${userId}/follow`);
      const newFollowing = new Set(get().followingIds);
      newFollowing.add(userId);
      set({ followingIds: newFollowing, isLoading: false });
    } catch (error: any) {
      console.error('Error following user:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  unfollow: async (userId: string) => {
    set({ isLoading: true });
    try {
      await api.delete(`/users/${userId}/follow`);
      const newFollowing = new Set(get().followingIds);
      newFollowing.delete(userId);
      set({ followingIds: newFollowing, isLoading: false });
    } catch (error: any) {
      console.error('Error unfollowing user:', error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
