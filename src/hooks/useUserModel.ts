import { useEffect, useState } from 'react';
import { FoodList, User, Food, Exercise } from '../types/user';
import axios from 'axios';

const URL = 'http://localhost:3000/user/';

//TODO - axios로 수정 + 에러처리
//후에 webstorage로 바꿔야함 그런데 비번 그냥 박아두는게 역시 많이 그러네용..

const useUserModel = (startDate: Date, endDate?: Date) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .post(`${URL}check`, {
        // email: 'yeojin@naver.com',
        // password: '1234',
        email: 'email@email.com',
        password: 'sdfdsf',
      })
      .then((response) => {
        const userData = response.data.user;

        //console.log(userData);

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

function filterFoodListByDateRange(
  foodList: Food[],
  startDate: Date,
  endDate: Date
) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return foodList.filter((food) => {
    const foodDate = new Date(food.createdAt);
    return foodDate >= start && foodDate <= end;
  });
}

function filterExerciseListByDateRange(
  exerciseList: Exercise[],
  startDate: Date,
  endDate: Date
): Exercise[] {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return exerciseList
    .map((exercise) => {
      // 날짜 범위에 맞는 scheduledDate만 필터링
      const filteredScheduledDates = exercise.scheduledDate?.filter(
        (scheduledItem) => {
          const scheduledDate = new Date(scheduledItem.date);
          return scheduledDate >= start && scheduledDate <= end;
        }
      );

      return {
        ...exercise,
        scheduledDate: filteredScheduledDates,
      };
    })
    .filter(
      (exercise) => exercise.scheduledDate && exercise.scheduledDate.length > 0
    );
}

export default useUserModel;
