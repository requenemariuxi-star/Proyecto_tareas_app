import { create } from 'zustand';
import api from '../services/api';

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    const res = await api.get('/api/tasks');
    set({ tasks: res.data, loading: false });
  },

  fetchToday: async () => {
    set({ loading: true });
    const res = await api.get('/api/tasks/today');
    set({ tasks: res.data, loading: false });
  },

  addTask: async (taskData) => {
    const res = await api.post('/api/tasks', taskData);
    set((s) => ({ tasks: [res.data, ...s.tasks] }));
    return res.data;
  },

  updateTask: async (id, data) => {
    const res = await api.put(`/api/tasks/${id}`, data);
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? res.data : t)),
    }));
  },

  toggleComplete: async (id) => {
    await api.patch(`/api/tasks/${id}/complete`);
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
  },

  deleteTask: async (id) => {
    await api.delete(`/api/tasks/${id}`);
    set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) }));
  },
}));

export default useTaskStore;
