import CaloryRecommend from './CaloryRecommend';

const setUser = (token: string, email: string, gender: string, age: number) => {
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
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

const getToken = () => {
  return localStorage.getItem('token');
};

const logOut = () => {
  localStorage.clear();
};

const getTodayCalory = () => {
  return localStorage.getItem('todayCalory');
};

const isLogin = () => {
  if (localStorage.getItem('email')) {
    return true;
  }
  return false;
};

export { setUser, getEmail, getToken, logOut, isLogin, getTodayCalory };
