import { useEffect, useState } from 'react';

import axios from 'axios';
import { User } from '../../../types/user';

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

//TODO - axios로 수정 + 에러처리
//후에 webstorage로 바꿔야함 그런데 비번 그냥 박아두는게 역시 많이 그러네용..

const useUserLogin = () => {
  const handleLoginButton = (email: string, password: string): number | any => {
    axios
      .post(`${URL}/check`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          alert('로그인 성공!');
        } else if (res.status === 404) {
          alert('아이디 또는 비밀번호를 확인해주세요.');
        }
        console.log('status', res.data.message);
        return res.status;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { onLoginButton: handleLoginButton };
};

export default useUserLogin;
