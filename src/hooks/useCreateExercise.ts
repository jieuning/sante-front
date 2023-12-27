import axios from 'axios';
import { Exercise, Food } from '../types/user';
import { removeIdField } from '../utils/RemoveIdField';
import { getEmail, getPassword } from '../utils/WebStorageControl';
const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

interface ListProps {
  exercise?: Exercise;
  food?: Food;
}

const useCreateExercise = () => {
  const handleCreate = async ({ exercise }: ListProps) => {
    {
      //업데이트를 위해 유저 전체 정보를 가져옴
      try {
        const response = await axios.post(`${URL}/check`, {
          email: getEmail(),
          password: getPassword(),
        });
        const user = removeIdField(response.data.user);
        delete user.__v;

        user.userExerciseList.push(exercise);

        // 변경된 유저 그대로 업데이트
        console.log('user', JSON.stringify(user));

        // 서버에 변경 사항 업데이트
        const putResponse = await axios.put(`${URL}`, JSON.stringify(user), {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (putResponse.status === 200) {
          console.log('PUT 요청이 성공적으로 완료되었습니다.');
        } else {
          console.error(
            'PUT 요청이 실패했습니다. HTTP 상태 코드:',
            putResponse.status
          );
        }
      } catch (error) {
        console.error('checkboxHook error', error);
      }
    }
  };
  return { handleCreate };
};
export default useCreateExercise;
