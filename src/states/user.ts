import create from 'zustand';
import axios from 'axios';
import { Exercise, FoodList, User } from '../types/user';
import { getToken } from '../utils/WebStorageControl';

const URL = import.meta.env.VITE_API_URL;

type ModalState = {
  food: boolean;
  exercise: boolean;
};

export type Store = {
  user: User | undefined;
  getUser: () => void;
  setUser: (userData: User) => Promise<void>;
  foodData: FoodList | undefined;
  foodId: string;
  exerciseId: string;
  exerciseData: Exercise | undefined;
  setFoodData: (foodItem: FoodList) => void;
  setExerciseData: (exerciseItem: Exercise | undefined) => void;
  setFoodId: (foodId: string) => void;
  setExerciseId: (exerciseId: string) => void;
  status: number;
  modalState: ModalState;
  setModalState: (key: keyof ModalState, isOpen: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  user: undefined,
  setUser: async (userData) => {
    try {
      const response = await axios.put(
        `${URL}/user`,
        JSON.stringify(userData),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      set({ user: response.data.user });
    } catch (error) {
      console.error('User update failed', error);
    }
  },
  getUser: async () => {
    try {
      const response = await axios.get(`${URL}/user/check`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      set({ user: response.data.user });
      set({ status: response.status });
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
  status: 0,
  foodId: '',
  setFoodId: (foodId: string) => {
    set({ foodId: foodId });
  },
  modalState: {
    food: false,
    exercise: false,
  },
  exerciseId: '',
  setExerciseId: (foodId: string) => {
    set({ exerciseId: foodId });
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
