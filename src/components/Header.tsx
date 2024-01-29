import styled from 'styled-components';
import { DynamicButton, DynamicButtonInfo } from '../components/DynamicButton';
import { useState } from 'react';
import { isLogin, logOut } from '../utils/WebStorageControl';
import Profile from '../components/icons/Profile';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin());

  const loginButtonInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'small',
    text: '로그인',
    fontWeight: 'bold',
    onClick: () => {
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
      navigate('/');
    },
  };

  return (
    <StyledHeader>
      <div onClick={handleLogoClick}>
        <StyledLogoImage src="../assets/app_logo.png" alt="로고 이미지" />
      </div>
      <StyledRightSection>
        {isLoggedIn ? (
          <>
            <StyledLogoutText onClick={Logout.onClick}>
              로그아웃
            </StyledLogoutText>
            <ProfileContainer>
              <Profile />
            </ProfileContainer>
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

const ProfileContainer = styled.div`
  position: relative;
`;
export default Header;
