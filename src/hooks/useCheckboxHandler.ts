import axios from 'axios';
import { useState } from 'react';
import useUserModelAll from './useUserModelAll';
import { format } from 'date-fns';
import { User } from '../types/user';

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
  const [user, setUser] = useState<User>();
  const handleCheckboxChange = async (
    checkboxKey: string,
    isChecked: boolean
  ) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [checkboxKey]: isChecked,
    }));

    //업데이트를 위해 유저 전체 정보를 가져옴
    axios
      .post(`${URL}/check`, {
        email: 'email@email.com',
        password: 'sdfdsf',
      })
      .then((res) => res.data.user)
      .then(setUser)
      .catch((error) => {
        console.error('There was an error!', error);
      });
    console.log('user', user);
    //업데이트할 데이터를 찾아 변경
    user?.userExerciseList?.forEach((exercise) => {
      exercise.scheduledDate?.forEach((scheduledDate) => {
        const dateKey = format(scheduledDate.date, 'yyyy-MM-dd');
        const key = `${exercise.exerciseId}-${dateKey}`;
        if (key === checkboxKey) {
          scheduledDate.isDone = isChecked;
        }
      });
    });

    //변경된 유저 그대로 업데이트
    console.log(JSON.stringify(user));
    axios.put(`${URL}`, JSON.stringify(user)).catch((error) => {
      console.error('checkboxHook error', error);
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        [checkboxKey]: !isChecked,
      }));
    });
  };

  return [checkboxStates, handleCheckboxChange];
};

export default useCheckboxHandler;
