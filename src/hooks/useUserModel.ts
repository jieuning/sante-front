import { useEffect, useState } from 'react';
import { User } from '../types/user';

const URL = 'http://localhost:3000/user/';

//TODO - axios로 수정 + 에러처리
//후에 webstorage로 바꿔야함 그런데 비번 그냥 박아두는게 역시 많이 그러네용..

const useUserModel = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch(`${URL}check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'email@email.com',
        password: 'sdfdsf',
      }),
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  return user;
};

export default useUserModel;
