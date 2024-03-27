import { useEffect, useState } from 'react';
import { User, Food, Exercise } from '../types/user';
import {
  filterExerciseListByDateRange,
  filterFoodListByDateRange,
} from '../utils/Date';
import axios from 'axios';
import { getToken } from '../utils/WebStorageControl';

const URL = `${import.meta.env.VITE_API_URL}/user`;

//TODO - axios로 수정 + 에러처리
//후에 webstorage로 바꿔야함 그런데 비번 그냥 박아두는게 역시 많이 그러네용..

const useUserModel = (startDate: Date, endDate?: Date) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get(`${URL}/check`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        const userData = response.data.user;
        let filteredFoodList = new Array<Food>();
        let filteredExerciseList = new Array<Exercise>();

        // 필터링 로직 추가
        if (userData.userFoodList !== undefined) {
          filteredFoodList = filterFoodListByDateRange(
            userData.userFoodList,
            startDate,
            endDate || startDate
          );
        }

        if (userData.userExerciseList !== undefined) {
          filteredExerciseList = filterExerciseListByDateRange(
            userData.userExerciseList,
            startDate,
            endDate || startDate
          );
        }
        setUser({
          ...userData,
          userFoodList: filteredFoodList,
          userExerciseList: filteredExerciseList,
        });
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return user;
};

export default useUserModel;
