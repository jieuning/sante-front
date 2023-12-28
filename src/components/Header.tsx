import styled from 'styled-components';
import { DynamicButton, DynamicButtonInfo } from '../components/DynamicButton';
import { useState } from 'react';
import { isLogin, logOut } from '../utils/WebStorageControl';
import Profile from '../components/icons/Profile';
import { useNavigate } from 'react-router-dom';

const LogoImage = () => {
  return <StyledLogoImage src="./logo.png" alt="logoImage" />;
};

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin());

  //테스트 데이터
  // useEffect(() => {
  //   setUser('test@test.com', 'test1111!', '여성');
  //   setIsLoggedIn(isLogin());
  // }, []);

  const loginButtonInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'small',
    text: '로그인',
    fontWeight: 'bold',
    onClick: () => {
      console.log('Login Button clicked!');
      navigate('/login');
    },
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/main');
    } else {
      navigate('/');
    }
  };

  const Logout = {
    onClick: () => {
      logOut();
      setIsLoggedIn(false);
      console.log('로그아웃 클릭');
      navigate('/');
    },
  };

  return (
    <StyledHeader>
      <div onClick={handleLogoClick}>
        <LogoImage></LogoImage>
      </div>
      <StyledRightSection>
        {isLoggedIn ? (
          <>
            <StyledLogoutText onClick={Logout.onClick}>
              로그아웃
            </StyledLogoutText>
            <Profile />
          </>
        ) : (
          <DynamicButton info={loginButtonInfo} />
        )}
      </StyledRightSection>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding-right: 13px;
  z-index: 10;
`;

const StyledLogoImage = styled.img`
  width: 80px;
  height: 40px;
  padding: 10px;
  cursor: pointer;
`;

const StyledLogoutText = styled.h3`
  color: var(--primary-color);
  font-size: 12px;
  cursor: pointer;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

const StyledRightSection = styled.div`
  display: flex;
  align-itmes: center;
`;

export default Header;
