import { create } from 'zustand';
import api from '@/lib/api';
import type { Unit, Lesson, LessonAttempt } from '@podium/shared';

interface PathState {
  units: (Unit & { lessons: (Lesson & { completed?: boolean })[], completed?: boolean })[];
  currentLesson: Lesson | null;
  isLoading: boolean;
  error: string | null;
  fetchPath: () => Promise<void>;
  startLesson: (lessonId: string) => Promise<void>;
  submitLesson: (lessonId: string, answers: any, errorsCount: number) => Promise<any>;
}

export const usePathStore = create<PathState>((set) => ({
  units: [],
  currentLesson: null,
  isLoading: false,
  error: null,

  fetchPath: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/path');
      set({ units: data.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to fetch path', isLoading: false });
      throw error;
    }
  },

  startLesson: async (lessonId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(`/path/lessons/${lessonId}/start`);
      set({ currentLesson: data.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to start lesson', isLoading: false });
      throw error;
    }
  },

  submitLesson: async (lessonId, answers, errorsCount) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(`/path/lessons/${lessonId}/submit`, { answers, errorsCount });
      set({ isLoading: false, currentLesson: null });
      return data.data;
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to submit lesson', isLoading: false });
      throw error;
    }
  },
}));
