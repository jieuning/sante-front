import create from 'zustand';
import axios from 'axios';
import { Exercise, FoodList, User } from '../types/user';
import { getEmail, getPassword } from '../utils/WebStorageControl';

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';
type ModalState = {
  food: boolean;
  exercise: boolean;
};

type Store = {
  user: User | undefined;
  getUser: () => void;
  setUser: (userData: User) => Promise<void>;
  foodData: FoodList | undefined;
  exerciseData: Exercise | undefined;
  setFoodData: (foodItem: FoodList) => void;
  setExerciseData: (exerciseItem: Exercise | undefined) => void;
  modalState: ModalState;
  setModalState: (key: keyof ModalState, isOpen: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  user: undefined,
  setUser: async (userData) => {
    try {
      const response = await axios.put(`${URL}`, JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      set({ user: response.data.user });
    } catch (error) {
      console.error('User update failed', error);
    }
  },
  getUser: async () => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      });
      set({ user: response.data.user });
    } catch (error) {
      console.error('User get failed', error);
    }
  },
  foodData: undefined,
  exerciseData: undefined,
  setFoodData: (foodItem: FoodList) => {
    set({ foodData: foodItem });
  },
  setExerciseData: (exerciseItem: Exercise | undefined) => {
    set({ exerciseData: exerciseItem });
  },

  modalState: {
    food: false,
    exercise: false,
  },

  setModalState: (key, isOpen) => {
    set((state) => ({
      modalState: {
        ...state.modalState,
        [key]: isOpen,
      },
    }));
  },
}));
