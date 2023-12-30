import { Exercise } from '../types/user';
import { removeIdField } from '../utils/RemoveIdField';
import { useStore } from '../states/user';

interface ListProps {
  exercise: Exercise;
}

const useModifyExercise = () => {
  const user = useStore((state) => state.user);
  const getUser = useStore((state) => state.getUser);
  const setUser = useStore((state) => state.setUser);
  const handleModify = async ({ exercise }: ListProps) => {
    try {
      getUser();

      const filteredUser = removeIdField(user);
      if (!filteredUser) {
        return;
      }
      delete filteredUser.__v;

      const exerciseId = exercise.exerciseId;

      filteredUser.userExerciseList?.forEach((exerciseData: Exercise) => {
        if (exerciseData.exerciseId === exerciseId) {
          console.log('---compare', exerciseData.exerciseId, '--', exerciseId);
          exerciseData.exerciseName =
            exercise.exerciseName || exerciseData.exerciseName;
          exerciseData.exerciseStartDate =
            exercise.exerciseStartDate || exerciseData.exerciseStartDate;
          exerciseData.exerciseEndDate =
            exercise.exerciseEndDate || exerciseData.exerciseEndDate;
          exerciseData.repeatDate =
            exercise.repeatDate || exerciseData.repeatDate;
          exerciseData.exerciseTime =
            exercise.exerciseTime || exerciseData.exerciseTime;

          exerciseData.scheduledDate = exercise.scheduledDate;
        }
      });

      // 변경된 유저 그대로 업데이트
      console.log('user', JSON.stringify(filteredUser));

      // 서버에 변경 사항 업데이트
      setUser(filteredUser);
    } catch (error) {
      console.error('수정 요청 실패', error);
    }
  };
  return { handleModify };
};
export default useModifyExercise;
