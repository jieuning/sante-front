import { useEffect, useState } from 'react';
import { User } from '../types/user';
import axios from 'axios';

const URL = 'http://localhost:3000/user/';

//TODO - axios로 수정 + 에러처리
//후에 webstorage로 바꿔야함 그런데 비번 그냥 박아두는게 역시 많이 그러네용..

const useUserModel = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .post(`${URL}check`, {
        email: 'email@email.com',
        password: 'sdfdsf',
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return user;
};

export default useUserModel;
