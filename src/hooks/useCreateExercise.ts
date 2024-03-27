import { Exercise } from '../types/user';
import { removeIdField } from '../utils/RemoveIdField';
import { useStore } from '../states/user';

interface ListProps {
  exercise: Exercise;
}

const useCreateExercise = () => {
  const user = useStore((state) => state.user);
  const getUser = useStore((state) => state.getUser);
  const setUser = useStore((state) => state.setUser);
  const handleCreate = ({ exercise }: ListProps) => {
    //업데이트를 위해 유저 전체 정보를 가져옴
    try {
      getUser();

      const filteredUser = removeIdField(user);
      if (!filteredUser) {
        return;
      }
      delete filteredUser.__v;

      filteredUser.userExerciseList?.push(exercise);

      setUser(filteredUser);
    } catch (error) {
      console.error('생성 요청 실패', error);
    }
  };
  return { handleCreate };
};
export default useCreateExercise;
