import styled from 'styled-components';
import { DynamicButton, DynamicButtonInfo } from '../components/DynamicButton';
import { useEffect, useState } from 'react';
import { setUser, isLogin, logOut } from '../utils/WebStorageControl';

const LogoImage = () => {
  return <StyledLogoImage src="./logo.png" alt="logoImage" />;
};

const loginButtonInfo: DynamicButtonInfo = {
  type: 'solid',
  size: 'small',
  text: '로그인',
  fontWeight: 'bold',
  onClick: () => console.log('Login Button clicked!'),
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin());

  //테스트 데이터
  useEffect(() => {
    setUser('test@test.com', 'test1111!');
    setIsLoggedIn(isLogin());
  }, []);

  const Logout = {
    onClick: () => {
      logOut();
      setIsLoggedIn(false);
      console.log('로그아웃 클릭');
    },
  };

  return (
    <StyledHeader>
      <LogoImage></LogoImage>
      {isLogin() ? (
        <StyledLogoutText onClick={Logout.onClick}>로그아웃</StyledLogoutText>
        
      ) : (
        <DynamicButton info={loginButtonInfo} />
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding-right: 13px;
`;

const StyledLogoImage = styled.img`
  width: 80px;
  height: 40px;
  padding: 10px;
`;

const StyledLogoutText = styled.h3`
  color: var(--primary-color);
  cursor: pointer;
`;
export default Header;
