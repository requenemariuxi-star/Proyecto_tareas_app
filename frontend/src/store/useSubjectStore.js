import { create } from 'zustand';
import api from '../services/api';

const useSubjectStore = create((set) => ({
  subjects: [],

  fetchSubjects: async () => {
    const res = await api.get('/api/subjects');
    set({ subjects: res.data });
  },

  addSubject: async (data) => {
    const res = await api.post('/api/subjects', data);
    set((s) => ({ subjects: [...s.subjects, res.data] }));
    return res.data;
  },

  updateSubject: async (id, data) => {
    const res = await api.put(`/api/subjects/${id}`, data);
    set((s) => ({
      subjects: s.subjects.map((sub) => (sub.id === id ? res.data : sub)),
    }));
  },

  deleteSubject: async (id) => {
    await api.delete(`/api/subjects/${id}`);
    set((s) => ({ subjects: s.subjects.filter((sub) => sub.id !== id) }));
  },
}));

export default useSubjectStore;
