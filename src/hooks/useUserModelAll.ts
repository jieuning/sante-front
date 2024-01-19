import { useEffect, useState } from 'react';
import { User } from '../types/user';

import axios from 'axios';
import { getToken } from '../utils/WebStorageControl';

const URL = `${import.meta.env.VITE_API_URL}/user`;

//TODO - axios로 수정 + 에러처리
//후에 webstorage로 바꿔야함 그런데 비번 그냥 박아두는게 역시 많이 그러네용..

const useUserModelAll = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get(`${URL}/check`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => res.data.user)
      .then(setUser)
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return user;
};

export default useUserModelAll;
