import CaloryRecommend from './CaloryRecommend';

const setUser = (
  email: string,
  password: string,
  gender: string,
  age: number
) => {
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('gender', gender);
  localStorage.setItem('age', age.toString());
  localStorage.setItem(
    'todayCalory',
    CaloryRecommend(gender, age.toString()).toString()
  );
};

const getEmail = () => {
  return localStorage.getItem('email');
};

const getPassword = () => {
  return localStorage.getItem('password');
};

const logOut = () => {
  localStorage.clear();
};

const isLogin = () => {
  if (localStorage.getItem('email')) {
    return true;
  }
  return false;
};

export { setUser, getEmail, getPassword, logOut, isLogin };
