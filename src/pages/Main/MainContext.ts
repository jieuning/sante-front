import { createContext } from 'react';

interface MainContextValue {
  closeFoodModal: () => void;
  closeExerciseModal: () => void;
}

export const MainContext = createContext<MainContextValue | null>(null);
