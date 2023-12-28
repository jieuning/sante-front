const setUser = (email: string, password: string, gender: string) => {
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('gender', gender);
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
