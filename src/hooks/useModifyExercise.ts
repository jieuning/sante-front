import axios from 'axios';
import { useCallback, useState } from 'react';
import useUserModelAll from './useUserModelAll';
import { format } from 'date-fns';
import { Exercise, User, Food } from '../types/user';
import { removeIdField } from '../utils/RemoveIdField';
const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

interface ListProps {
  exercise: Exercise;
}

const useModifyExercise = () => {
  const handleModify = async ({ exercise }: ListProps) => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: 'yeojin2@naver.com',
        password: '1234',
      });
      //업데이트를 위해 유저 전체 정보를 가져옴
      const user = removeIdField(response.data.user);
      delete user.__v;

      const exerciseId = exercise.exerciseId;

      user.userExerciseList?.forEach((exerciseData: Exercise) => {
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
  };
  return { handleModify };
};
export default useModifyExercise;
