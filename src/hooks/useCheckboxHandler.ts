import axios from 'axios';
import { useState } from 'react';
import { format } from 'date-fns';
import { Exercise } from '../types/user';
import { getEmail, getPassword } from '../utils/WebStorageControl';
import { useStore } from '../states/user';

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

interface CheckboxStates {
  [key: string]: boolean;
}

const useCheckboxHandler = (
  initialState: CheckboxStates
): [
  CheckboxStates,
  (checkboxKey: string, isChecked: boolean) => Promise<void>,
] => {
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>(initialState);
  const user = useStore((state) => state.user);
  const getUser = useStore((state) => state.getUser);
  const setUser = useStore((state) => state.setUser);
  const handleCheckboxChange = async (
    checkboxKey: string,
    isChecked: boolean
  ) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [checkboxKey]: isChecked,
    }));

    //업데이트를 위해 유저 전체 정보를 가져옴
    try {
      getUser();

      let filteredUser = removeIdField(user);
      if (!filteredUser) return;

      delete filteredUser?.__v;

      // 업데이트할 데이터를 찾아 변경
      filteredUser.userExerciseList?.forEach((exercise: Exercise) => {
        exercise.scheduledDate?.forEach((scheduledDate) => {
          const dateKey = format(scheduledDate.date, 'yyyy-MM-dd');
          const key = `${exercise.exerciseId}-${dateKey}`;
          if (key === checkboxKey) {
            scheduledDate.isDone = isChecked;
          }
        });
      });

      // 변경된 유저 그대로 업데이트
      console.log('user', JSON.stringify(filteredUser));

      // 서버에 변경 사항 업데이트
      setUser(filteredUser);
      // await axios.put(`${URL}`, JSON.stringify(user), {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
    } catch (error) {
      console.error('checkboxHook error', error);
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        [checkboxKey]: !isChecked,
      }));
    }
  };

  return [checkboxStates, handleCheckboxChange];
};

function removeIdField<T>(obj: T): T {
  if (Array.isArray(obj)) {
    // 배열인 경우 각 요소에 대해 재귀적으로 호출
    return obj.map((item) => removeIdField(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    // 객체인 경우
    const newObj = { ...obj } as any;
    delete newObj._id; // _id 필드 제거

    // 객체의 각 키에 대해 재귀적으로 호출
    Object.keys(newObj).forEach((key) => {
      newObj[key] = removeIdField(newObj[key]);
    });

    return newObj as T;
  }
  // 배열이나 객체가 아닌 경우 그대로 반환
  return obj;
}

export default useCheckboxHandler;
