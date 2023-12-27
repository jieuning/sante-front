import { createContext } from 'react';

interface MainContextValue {
  closeFoodModal: (value: boolean) => void;
  closeExerciseModal: (value: boolean) => void;
}

export const MainContext = createContext<MainContextValue | null>(null);
