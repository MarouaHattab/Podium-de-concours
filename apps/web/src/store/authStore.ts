import { create } from 'zustand';
import api from '@/lib/api';
import type { User, AccessibilityPreferences } from '@podium/shared';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (login: string, password: string) => Promise<void>;
  register: (login: string, name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
  updateAccessibility: (prefs: AccessibilityPreferences) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (login, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { login, password });
      localStorage.setItem('token', data.data.token);
      set({ user: data.data.user, token: data.data.token, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Login failed', isLoading: false });
      throw error;
    }
  },

  register: async (login, name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/register', { login, name, email, password });
      localStorage.setItem('token', data.data.token);
      set({ user: data.data.user, token: data.data.token, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  fetchMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/users/me');
      set({ user: data.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to fetch user', isLoading: false });
      throw error;
    }
  },

  updateAccessibility: async (prefs) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.patch('/users/me/accessibility', { accessibilityPrefs: prefs });
      set({ user: data.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to update preferences', isLoading: false });
      throw error;
    }
  },
}));
