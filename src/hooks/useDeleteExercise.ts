import { Exercise } from '../types/user';
import { removeIdField } from '../utils/RemoveIdField';
import { useStore } from '../states/user';

const useDeleteExercise = () => {
  const user = useStore((state) => state.user);
  const getUser = useStore((state) => state.getUser);
  const setUser = useStore((state) => state.setUser);
  const handleDelete = async (exerciseId: string) => {
    try {
      getUser();

      const filteredUser = removeIdField(user);
      if (!filteredUser) {
        return;
      }
      delete filteredUser.__v;

      const exerciseFiltered = filteredUser.userExerciseList?.filter(
        (exerciseData: Exercise) => {
          return exerciseData.exerciseId !== exerciseId;
        }
      );

      filteredUser.userExerciseList = exerciseFiltered;

      console.log('user', JSON.stringify(filteredUser));

      setUser(filteredUser);
    } catch (error) {
      console.error('삭제 요청 실패', error);
    }
  };
  return { handleDelete };
};
export default useDeleteExercise;
