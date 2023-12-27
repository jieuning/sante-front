import { useEffect, useState } from 'react';
import { User } from '../types/user';

import axios from 'axios';
import { getEmail, getPassword } from '../utils/WebStorageControl';

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

//TODO - axios로 수정 + 에러처리
//후에 webstorage로 바꿔야함 그런데 비번 그냥 박아두는게 역시 많이 그러네용..

const useUserModelAll = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
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
