import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    set({ token, user, isAuthenticated: true });
    return user;
  },

  register: async (name, email, password) => {
    const res = await api.post('/api/auth/register', { name, email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    set({ token, user, isAuthenticated: true });
    return user;
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },

  fetchMe: async () => {
    try {
      const res = await api.get('/api/auth/me');
      set({ user: res.data });
    } catch {
      localStorage.removeItem('token');
      set({ token: null, user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
